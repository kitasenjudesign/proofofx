import { type } from 'os';
import * as THREE from 'three';
import { MeshBasicMaterial, Vector3 } from 'three';
import { Forces } from '../Forces';
import vert from "./brush.vert";
import frag from "./brush.frag";

import glslify from 'glslify';
import { Params } from '../../../proof/data/Params';
import { SRandom } from '../../data/SRandom';




export class Brushes extends THREE.Mesh{

    vertices    :Float32Array;
    colors      :Float32Array;
    randoms     :Float32Array;
    oldPos:Vector3;
    isDirty:boolean=false;
    //width:number = 0;
    //widthRatio:number = 1;
    mat: THREE.ShaderMaterial;
    static instance:Brushes;


    public static getInstance():Brushes{
        if(Brushes.instance == null){
            Brushes.instance = new Brushes();
        }
        return Brushes.instance;
      }

    constructor(){

        // BufferGeometryを使って四角形を作成
        const geometry = new THREE.BufferGeometry();

        //
        //this.widthRatio = 0.8+0.2*Math.random();


        // 頂点データを定義
        let vertices = new Float32Array(Forces.NUM*3*4);//vec3が4個
        let colors  = new Float32Array(Forces.NUM*3*4);//vec3が4個
        let uvs     = new Float32Array(Forces.NUM*2*4);//vec2が4個
        // インデックスを定義（2つの三角形を指定）
        let indices = new Uint16Array(Forces.NUM*6);//3角形が2個で6
        let randoms = new Float32Array(Forces.NUM*3*4);


        for(let i=0;i<Forces.NUM;i++){

            for(let j=0;j<4;j++){//4点
                vertices[i*12+j*3+0] = 0;
                vertices[i*12+j*3+1] = 0;
                vertices[i*12+j*3+2] = 0;
            }

            for(let j=0;j<4;j++){//4点
                colors[i*12+j*3+0] = SRandom.random();
                colors[i*12+j*3+1] = SRandom.random();
                colors[i*12+j*3+2] = SRandom.random();
            }

            let ran = SRandom.random();
            for(let j=0;j<4;j++){//4点
                randoms[i*12+j*3+0] = ran;
                randoms[i*12+j*3+1] = SRandom.random();
                randoms[i*12+j*3+2] = SRandom.random();
            }
                uvs[i*8+0] = 0;//u//左上
                uvs[i*8+1] = 0;//v
            
                uvs[i*8+2] = 1;//u//右上
                uvs[i*8+3] = 0;//v

                uvs[i*8+4] = 1;//u//右下
                uvs[i*8+5] = 1;//v

                uvs[i*8+6] = 0;//u//左下
                uvs[i*8+7] = 1;//v

                indices[i*6+0] = i*4+0;//4点
                indices[i*6+1] = i*4+1;
                indices[i*6+2] = i*4+2;

                indices[i*6+3] = i*4+0;//4点
                indices[i*6+4] = i*4+2;
                indices[i*6+5] = i*4+3;            
        }

        /*
        const indices = new Uint16Array([
            0, 1, 2, // 最初の三角形
            0, 2, 3  // 2番目の三角形
        ]);
        */
     
        // 頂点データをBufferAttributeとしてgeometryに追加
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('uvs', new THREE.BufferAttribute(uvs, 2));
        geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms, 3));
        // インデックスをgeometryに追加
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        // マテリアルを作成        
        let tex1 = new THREE.TextureLoader().load(Params.PATH+"brush.png");
        let mat = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                tex     :{value:tex1},
                detail  :{value:5.0},
                border: {value:0},
                highlight: {value: 0.5},
                opacity: {value: 1.0}
            },
            transparent: true,
            vertexColors: true,
            vertexShader: glslify(vert),
            fragmentShader: glslify(frag),
            //opacity: 0.5         
        });
        //mat.wireframe=true;

        // 四角形のメッシュを作成し、シーンに追加
        super(geometry, mat);
        this.mat = mat;

        //this.width      = SRandom.random()*0.5+0.5;
        //this.widthRatio = SRandom.random()*0.5+0.5;
        
        this.vertices   = vertices;
        this.colors     = colors;
        this.randoms    = randoms;
        this.geometry.attributes.position.needsUpdate = true;

        let gui = Params.gui.addFolder("==BRUSH==");
            gui.close();
            //gui.add(this,"widthRatio",0,10).listen();
            gui.add(this.mat.uniforms.highlight,"value",0,1).name("highlight").listen();
            gui.add(this.mat.uniforms.border,"value",0,1).name("border").listen();
            gui.add(this.mat.uniforms.detail,"value",0,20).name("detail").listen();
            gui.add(this.mat.uniforms.opacity,"value",0,1).name("opacity").listen();

    }

    setVertex(
        index:number,vertexNo:number,
        xx:number, yy:number, zz:number,
        rr:number, gg:number, bb:number,
        life:number,alpha:number){
        
        this.vertices[index+vertexNo*3+0]=xx;//Math.floor(xx/10)*10;
        this.vertices[index+vertexNo*3+1]=yy;//Math.floor(yy/10)*10;
        this.vertices[index+vertexNo*3+2]=zz;

        this.colors[index+vertexNo*3+0]=rr;
        this.colors[index+vertexNo*3+1]=gg;
        this.colors[index+vertexNo*3+2]=bb;
        
        this.randoms[index+vertexNo*3+1] = life;//y
        this.randoms[index+vertexNo*3+2] = 1;//alpha;//x
        //this.randoms[index+vertexNo*3+2] = 0;//z

    }

    connect(
        idx:number,
        p1:THREE.Vector3,
        p2:THREE.Vector3,
        rr:number,
        gg:number,
        bb:number,
        ww:number,
        life:number,
        alpha:number
    ): void {
        
        let dx = p2.x-p1.x;
        let dy = p2.y-p1.y;

        let rad = Math.atan2(dy,dx);
        let amp = ww*Params.widthRatio;//*(1-life);

        let lx=amp*Math.cos(rad-Math.PI/2);
        let ly=amp*Math.sin(rad-Math.PI/2);
        let rx=amp*Math.cos(rad+Math.PI/2);
        let ry=amp*Math.sin(rad+Math.PI/2);

        this.setVertex(idx*12,2,//2
            p1.x+lx, p1.y+ly, 0,rr,gg,bb,life,alpha)//左上
        this.setVertex(idx*12,3,//3
            p1.x+rx, p1.y+ry, 0,rr,gg,bb,life,alpha)//右上

        this.setVertex(idx*12,0,//0
            p2.x+rx, p2.y+ry, 0,rr,gg,bb,life,alpha)//右下
        this.setVertex(idx*12,1,//1
            p2.x+lx, p2.y+ly, 0,rr,gg,bb,life,alpha)//左下
    
            this.isDirty=true;
            //this.geometry.attributes.position.needsUpdate = true;
        // 頂点データのBufferAttributeを更新
        
    }

    update():void{
        if(this.isDirty){
            this.geometry.attributes.position.needsUpdate = true;
            this.geometry.attributes.color.needsUpdate = true;
            this.geometry.attributes.randoms.needsUpdate = true;
            this.isDirty=false;
        }
    }


}