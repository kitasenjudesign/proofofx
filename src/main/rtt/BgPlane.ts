
import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, TextureLoader, MeshPhongMaterial } from 'three';
//import { Mouse } from '../data/Mouse';
//import { FilpFlopSceneBase } from './FlipFlopSceneBase';
import vert from "./feedback/simple.vert";
import frag from "./feedback/simple.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';
export class BgPlane extends THREE.Mesh{
   
    public bgMaterial:THREE.ShaderMaterial;

    constructor(){

        let planeGeometry = new THREE.PlaneGeometry(100,100,1,1);
        let bgMaterial = 
            new THREE.ShaderMaterial({
                uniforms: {
                    time: {value: 0},
                    attenuation: {value: 0.999},
                    size:{value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                    tex:{value:null},
                    tex2:{value:null}
                },
                vertexShader:   glslify(vert),
                fragmentShader: glslify(frag)
            });

        super(planeGeometry, bgMaterial );

        this.bgMaterial = bgMaterial;
        Params.gui.add(
            this.bgMaterial.uniforms.attenuation,
            "value", 0.8, 1.0
        ).step(0.001).name("attenuation");

    }

    public update(
        renderTgt:THREE.WebGLRenderTarget
    ): void {
        
        this.bgMaterial.uniforms.tex.value = renderTgt.texture;
        this.bgMaterial.uniforms.size.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        this.bgMaterial.uniforms.time.value += 0.01;      

    }

    public setDisplacementMap(t:THREE.Texture){
        
        this.bgMaterial.uniforms.tex2.value = t;

    }

    public resize(sx:number, sy:number): void {

        this.scale.set(sx,sy,1)

    }


}