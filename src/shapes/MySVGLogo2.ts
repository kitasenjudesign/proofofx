import * as THREE from 'three';
import { MeshBasicMaterial, BoxGeometry, Object3D, Shape, Vector3, Mesh } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Params } from '../proof/data/Params';

import myVert from "./logo.vert";
import myFrag from "./logo2.frag";
import glslify from 'glslify';
import { MySVGLogo } from './MySVGLogo';
import { Colors } from '../proof/data/Colors';

export class MySVGLogo2 extends THREE.Object3D{

    private mat:THREE.ShaderMaterial;

    private flashing:boolean = false;
    private flashCount:number = 0;

    constructor(){
        super();
    }

    init( logo:Object3D ){

        let opacity = 0.1;
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                lineY:{value:0},
                textCol:{value:new THREE.Vector4(1,1,1,opacity)},
                opacity:{value:0.1},
                time:{value:0}
                //textureSize: {value: new THREE.Vector2(textureWidth, textureWidth)}
            },
            vertexShader: glslify(myVert),
            fragmentShader: glslify(myFrag),
            side: THREE.DoubleSide
        })
        this.mat.transparent=true;

        for(let i=0;i<logo.children.length;i++){
            const mesh = logo.children[i] as THREE.Mesh;
            let m = new Mesh(mesh.geometry,this.mat);
            m.position.copy(mesh.position);
            m.scale.copy(mesh.scale)
            this.add(m);
        }

        this.setScale();
        
        let f = Params.gui.addFolder("== Logo2 ==");
        f.add(this,"visible").listen();

    }

    setScale(){
        this.scale.set(
            Params.SVG_SCALE,
            -Params.SVG_SCALE,
            Params.SVG_SCALE
        );
    }

    reset(){
        this.flashCount=0;
    }

    setY(yy:number){

        this.flashCount++;
        if(this.flashCount<15){
            this.visible = this.flashCount%2==0 ? true : false;
        }else{
            this.visible = true;
        }


        this.mat.uniforms.textCol.value.x = Colors.colors[0].r;
        this.mat.uniforms.textCol.value.y = Colors.colors[0].g;
        this.mat.uniforms.textCol.value.z = Colors.colors[0].b;
        
        this.mat.uniforms.lineY.value = yy;
        this.mat.uniforms.time.value += 0.01;
        
    }


}