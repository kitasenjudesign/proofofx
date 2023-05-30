import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { BgPlane } from './BgPlane';
import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./calc/calc.vert";
import frag from "./calc/calc.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';

export class LastCalcScene extends FilpFlopSceneBase{

    constructor(webglRenderer:WebGLRenderer){
        super(
            webglRenderer,
            Params.stageWidth,
            Params.stageHeight,
            {
                uniforms: {
                    time: {value: 0},
                    size:{
                        value: new THREE.Vector2(Params.stageWidth,Params.stageHeight),
                    },
                    //alphaSpeed:{value:0.8},
                    alphaSpeed2:{value:1},
                    alphaSpeed:{value:5},//5},
                    maxAlpha:{value:0.92},//65},
                    gensui:{value:1},
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
        g.add(uniforms.alphaSpeed2,"value",1,20).name("alphaSpeed2");
        g.add(uniforms.alphaSpeed,"value",0,5).name("alphaSpeed");
        g.add(uniforms.maxAlpha,"value",0,1).name("maxAlpha");
        g.add(uniforms.gensui,"value",0,1).name("gensui");

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