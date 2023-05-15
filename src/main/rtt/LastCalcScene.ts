import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { BgPlane } from './BgPlane';
import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./calc/calc.vert";
import frag from "./calc/calc.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';

export class LastCalcScene extends FilpFlopSceneBase{

    constructor(){
        super(
            window.innerWidth,
            window.innerHeight,
            {
                uniforms: {
                    time: {value: 0},
                    size:{
                        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
                    },
                    alphaSpeed:{value:0.8},
                    maxAlpha:{value:0.9},
                    tex:{value:null},
                    tex1:{value:null},
                    tex2:{value:null}
                },
                vertexShader:   glslify(vert),
                fragmentShader: glslify(frag)
            }
        )

        let uniforms = this.feedbackMaterial.uniforms;

        let g = Params.gui.addFolder("== LAST CALC ==");
        g.close();
        g.add(uniforms.alphaSpeed,"value",0,1).name("fixRalphaSpeedatio");
        g.add(uniforms.maxAlpha,"value",0,1).name("maxAlpha");


        //Params.gui.add(this,"clearTargets");
    }

    update(
        renderer:WebGLRenderer,
        colorTex:Texture,
        blurTex:Texture
    ): void {
    
        this.uniforms.tex.value     = this.getTex();
        this.uniforms.tex1.value    = colorTex;
        this.uniforms.tex2.value    = blurTex;

        super.render(renderer);
    }

}