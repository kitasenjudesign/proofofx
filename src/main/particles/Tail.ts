import { type } from 'os';
import * as THREE from 'three';
import { MeshBasicMaterial, Vector3 } from 'three';
import { Forces } from './Forces';
import { Lines } from './Lines';
import { DataManager } from '../data/DataManager';
import { Lines2 } from './Lines2';
import { SRandom } from '../data/SRandom';

export class Tail extends THREE.Mesh{

    vertices:Float32Array;
    oldPos:Vector3;
    width:number=1;

    constructor(){
        // BufferGeometryを使って四角形を作成
        const geometry = new THREE.BufferGeometry();

        // 頂点データを定義
        let vertices = new Float32Array([
            -1.0, -1.0, 0.0, // 左下
            1.0, -1.0, 0.0,  // 右下
            1.0, 1.0, 0.0,   // 右上
            -1.0, 1.0, 0.0   // 左上
        ]);

        const colors = new Float32Array([
            1.0, 0.0, 0.0, // 左下: 赤
            0.0, 1.0, 0.0, // 右下: 緑
            0.0, 0.0, 1.0, // 右上: 青
            1.0, 1.0, 0.0  // 左上: イエロー
        ]);
        

        // 頂点データをBufferAttributeとしてgeometryに追加
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // インデックスを定義（2つの三角形を指定）
        const indices = new Uint16Array([
            0, 1, 2, // 最初の三角形
            0, 2, 3  // 2番目の三角形
        ]);

        // インデックスをgeometryに追加
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        // マテリアルを作成
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff, 
            side: THREE.DoubleSide,
            vertexColors: true
        });

        // 四角形のメッシュを作成し、シーンに追加
        super(geometry, material);

        this.width=3+30*SRandom.random();
        this.vertices=vertices;
    }

    setVertex(index:number, x:number, y:number, z:number){
        this.vertices[index*3+0]=x;
        this.vertices[index*3+1]=y;
        this.vertices[index*3+2]=z;
    }


    update(
        p1:THREE.Vector3,
        p2:THREE.Vector3    
    ): void {
        this.position.copy(p1);

        let dx = p2.x-p1.x;
        let dy = p2.y-p1.y;

        let rad = Math.atan2(dy,dx);
        let amp = this.width;

        let lx=amp*Math.cos(rad-Math.PI/2);
        let ly=amp*Math.sin(rad-Math.PI/2);
        let rx=amp*Math.cos(rad+Math.PI/2);
        let ry=amp*Math.sin(rad+Math.PI/2);

        this.setVertex(2,
            lx,ly,0)//左上
        this.setVertex(3,
            rx,ry,0)//右上

        this.setVertex(0,
            dx+rx,
            dy+ry,
            0)//右下
        this.setVertex(1,
            dx+lx,
            dy+ly,
            0)//左下
    

        /*
        -1.0, -1.0, 0.0, // 左下
        1.0, -1.0, 0.0,  // 右下
        1.0, 1.0, 0.0,   // 右上
        -1.0, 1.0, 0.0   // 左上
        */




    
        // 頂点データのBufferAttributeを更新
        this.geometry.attributes.position.needsUpdate = true;
    }


}