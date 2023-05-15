import * as THREE from 'three';
import { QuadTreePoint } from './QuadTreePoint';

export class Rectangle{

    public x:number;
    public y:number;
    public w:number;
    public h:number;

    constructor(x:number,y:number,w:number,h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public contains(point:QuadTreePoint):boolean{
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }

    public intersects(range:Rectangle):boolean{
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
    }

    /*
    public show(){
        let geo = new BoxGeometry(this.w*2,this.h*2,1);
        let mat = new MeshBasicMaterial({color:0xff0000});
        let mesh = new THREE.Mesh(geo,mat);
        mesh.position.set(this.x,this.y,0);
        return mesh;
    }*/


}