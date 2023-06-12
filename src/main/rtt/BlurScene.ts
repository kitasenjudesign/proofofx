
import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./feedback/simple.vert";
import frag from "./feedback/blur.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';
import { DataManager } from '../data/DataManager';

export class BlurScene extends FilpFlopSceneBase{



    constructor(renderer:WebGLRenderer){

        let sizeX = Params.stageWidth;
        let sizeY = Params.stageHeight;

        super(
            renderer,
            sizeX,
            sizeY,
            {
                uniforms: {
                    time: {value: 0},
                    size:{
                        value: new THREE.Vector2(sizeX,sizeY)
                    },
                    blurRatio:{value:0.15},
                    attenuationSpeed: {value: 0.008},//{value: 0.002},
                    blurScale: {value: 1},
                    tex:{value:null},
                    //tex1:{value:null},
                    tex2:{value:null}
                },
                vertexShader:   glslify(vert),
                fragmentShader: glslify(frag)
            }
        )

        let g = Params.gui.addFolder("== BLUR ==");
        g.add(
            this.feedbackMaterial.uniforms.attenuationSpeed,
            "value", 0, 0.01).step(0.0005).name("attenuationSpeed");
        g.add(
            this.feedbackMaterial.uniforms.blurRatio,
            "value", 0.0, 1.0).step(0.001).name("BlurRatio");
        g.add(
            this.feedbackMaterial.uniforms.blurScale,
            "value", 0.1, 3.0).step(0.1).name("BlurScale");
    
            


        //Params.gui.add(this,"clearTargets");

    }

    update(
        renderer:WebGLRenderer,
        inputTex:Texture
    ): void {   
        this.uniforms.tex.value = this.getTex();
        this.uniforms.tex2.value = inputTex;
        this.uniforms.time.value += 0.01;      
        this.uniforms.size.value.x = Params.stageWidth;
        this.uniforms.size.value.x = Params.stageHeight;
        
        super.render(renderer);
    }

}