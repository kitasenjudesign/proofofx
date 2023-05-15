import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./feedback/simple.vert";
import frag from "./pigment/pigment.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';

export class PigmentScene extends FilpFlopSceneBase{

    constructor(){

        super(
            window.innerWidth,
            window.innerHeight,
            {
                uniforms: {
                    time: {value: 0},
                    size:{
                        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
                    },
                    attenuation: {value: 0.995},
                    tex:{value:null},
                    tex1:{value:null},
                    tex2:{value:null},
                    displacement:{value:new THREE.Vector2(0.01,0.01)}
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

        this.clearColor = 0xffffff;
        this.clearOpacity = 1.0;

    }

    update(
        renderer:WebGLRenderer,
        inputTex:Texture,
        blurTex:Texture
    ): void {   
        this.uniforms.tex.value = this.getTex();//feedback
        this.uniforms.tex1.value = inputTex;
        this.uniforms.tex2.value = blurTex;
        this.uniforms.time.value += 0.01;
        super.render(renderer);
    }

}