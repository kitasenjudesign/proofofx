import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./feedback/simple.vert";
import frag from "./pigment/pigment.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';

export class PigmentScene extends FilpFlopSceneBase{

    constructor(webglRenderer:WebGLRenderer){

        super(
            webglRenderer,
            Params.stageWidth,
            Params.stageHeight,
            {
                uniforms: {
                    time: {value: 0},
                    size:{
                        value: new THREE.Vector2(Params.stageWidth, Params.stageHeight)
                    },
                    attenuation: {value: 0.995},
                    tex:{value:null},
                    tex1:{value:null},
                    tex2:{value:null},
                    displacement:{value:new THREE.Vector2(0.001,0.001)}
                },
                vertexShader:   glslify(vert),
                fragmentShader: glslify(frag)
            }
        )

        let uniforms =this.feedbackMaterial.uniforms;

        let g = Params.gui.addFolder("== PIGMENT ==");
            g.close();
            g.add(uniforms.displacement.value, "x", 0.0, 0.05).step(0.001).name("displacement x");
            g.add(uniforms.displacement.value, "y", 0.0, 0.05).step(0.001).name("displacement y");
        //g.add(uniforms.attenuation, "value", 0.8, 1.0).step(0.001).name("attenuation");
        //ベースは背景と同じ色にする！！！

        
        this.clearOpacity = 1.0;
        
        this.clearTargets();

    }

    update(
        renderer:WebGLRenderer,
        inputTex:Texture,
        blurTex:Texture
    ): void {   
        this.clearColor = Params.bgColorHex;
        this.uniforms.tex.value = this.getTex();//feedback
        this.uniforms.tex1.value = inputTex;
        this.uniforms.tex2.value = blurTex;
        this.uniforms.time.value += 0.01;
        super.render(renderer);
    }

}