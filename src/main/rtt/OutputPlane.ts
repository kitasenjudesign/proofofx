import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { RTTSceneBase } from './RTTSceneBase';
import myVert from "./output/bg1.vert";
import myFrag from "./output/bg2.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';


export class OutputPlane extends THREE.Mesh{

    private geo:THREE.PlaneGeometry;
    private mat:THREE.ShaderMaterial;
    //public bgColor:{r:number,g:number,b:number} = {r:0.5,g:0.5,b:0.5};

    constructor(){
        
        let geo = new THREE.PlaneGeometry( 100, 100, 1 );
        let mat = new THREE.ShaderMaterial({
          uniforms: {
              tex:{value:null},
              tex2:{value:null},
              size:{value: new THREE.Vector2(Params.stageWidth,Params.stageHeight)},
              alpha:{value:1.0},
              ratio:{value:0.0},
              bgCol:{value:new THREE.Vector4(
                Params.bgColor.r,
                Params.bgColor.g,
                Params.bgColor.b,
                1.0
              )},
            //textureSize: {value: new THREE.Vector2(textureWidth, textureWidth)}
          },
          vertexShader: glslify(myVert),
          fragmentShader: glslify(myFrag),
          side: THREE.DoubleSide
        });
     
        super( geo,mat );

        this.geo = geo;
        this.mat = mat;

        let g = Params.gui.addFolder("== Output ==");
        g.addColor(Params,"bgColor").onChange(()=>{


          

        })

        let gg = Params.gui.addFolder("== Output ==");
        gg.add(this.mat.uniforms.alpha,"value",0.0,1.0).step(0.01).name("alpha");
        gg.add(this.mat.uniforms.ratio,"value",0.0,1.0).step(0.01).name("ratio");


    }


    setTex(t:Texture){
        
        this.mat.uniforms.tex.value = t;

    }

    setTex2(t:Texture){
      this.mat.uniforms.tex2.value = t;

    }


    resize(scaleX:number,scaleY:number){
        
        this.scale.set(scaleX,scaleY,1);

    }

    update(){

      console.log("update bg ",Params.bgColor);
      this.mat.uniforms.bgCol.value.x = Params.bgColor.r;
      this.mat.uniforms.bgCol.value.y = Params.bgColor.g;
      this.mat.uniforms.bgCol.value.z = Params.bgColor.b;
      this.mat.uniforms.bgCol.value.w = Params.bgColorAlpha;

    }


}
