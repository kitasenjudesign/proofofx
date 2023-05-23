import * as THREE from 'three';
import { MeshBasicMaterial, BoxGeometry, Object3D, Shape, Vector3, Mesh } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Params } from '../proof/data/Params';

import myVert from "./logo.vert";
import myFrag from "./logo.frag";
import glslify from 'glslify';
import { Colors } from '../proof/data/Colors';
import { MyGUI } from '../proof/data/MyGUI';
import { MySVGLine } from './MySVGLine';
import { DataManager } from '../main/data/DataManager';


export class MySVGLogo extends THREE.Object3D{

    private mat         :THREE.ShaderMaterial;
    public lineMesh    :MySVGLine;
    public fillMesh    :Object3D;
    public opacity     :number = 0.3;
    private frameCount :number = 0;

    constructor(){
        super();
    }

    init( shapes:Shape[][] ){


        let opacity = 0.1;

        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                lineY:{value:0},
                col1:{value:new THREE.Vector4(1,0,1,opacity)},
                col2:{value:new THREE.Vector4(0,1,1,opacity)},
                time:{value:0},
                //textureSize: {value: new THREE.Vector2(textureWidth, textureWidth)}
            },
            vertexShader: glslify(myVert),
            fragmentShader: glslify(myFrag),
            side: THREE.DoubleSide,
            //wireframe:true

        })
        this.mat.transparent=true;

        this.fillMesh = new Object3D();
        this.add(this.fillMesh)
        for ( let j = 0; j < shapes.length; j ++ ) {
            const shape = shapes[ j ]; 
            const geometry = new THREE.ShapeGeometry( shape );
            const mesh = new THREE.Mesh( geometry, this.mat );      
            this.fillMesh.add(mesh);
        }

        this.setScale();

        
        this.lineMesh = new MySVGLine();
        this.lineMesh.init();
        this.lineMesh.show()
        this.add(this.lineMesh);
        
        
        this.lineMesh.updateLines();
        this.lineMesh.update();
        

        let f = Params.gui.addFolder("== Logo ==");
            f.close();
            f.add(this,"visible").name("visible").listen();
            f.add(this.fillMesh,"visible").name("fillMesh.visible").listen();
            f.add(this.lineMesh,"visible").name("lineMesh.visible").listen();
            f.add(this,"opacity",0,1).name("opacity").listen();

        this.visible=true;
        this.fillMesh.visible=false;
        this.lineMesh.visible=true;

        //setTimeout(()=>{
            //this.visible = false;
        //},2000);        
        this.setScale();
    }

    reset(){
        this.lineMesh.updateLines();
    }

    setScale(){
       
        if(this.fillMesh){
            this.fillMesh.scale.set(
                Params.SVG_SCALE,
                -Params.SVG_SCALE,
                Params.SVG_SCALE
            );    
        }
        if(this.lineMesh){
            this.lineMesh.scale.set(
                Params.SVG_SCALE,
                -Params.SVG_SCALE,
                Params.SVG_SCALE
            );       
        }

    }

    setY(yy:number){

        //if(this.frameCount++%120==0)this.visible=true;
        //else this.visible=false;

        this.mat.uniforms.col1.value.x = Colors.logoColor.r;
        this.mat.uniforms.col1.value.y = Colors.logoColor.g;
        this.mat.uniforms.col1.value.z = Colors.logoColor.b;
        this.mat.uniforms.col1.value.w = 0;//this.opacity;

        this.mat.uniforms.col2.value.x = Colors.logoColor.r;
        this.mat.uniforms.col2.value.y = Colors.logoColor.g;
        this.mat.uniforms.col2.value.z = Colors.logoColor.b;
        this.mat.uniforms.col2.value.w = this.opacity;

        this.mat.uniforms.lineY.value = yy;
        this.mat.uniforms.time.value += 0.01;

        this.lineMesh.setY(yy);
        this.lineMesh.update();

    }


}