
//https://kitasenjudesign.hatenablog.com/entry/2020/05/15/185214\
//https://editor.p5js.org/kitasenjudesign/sketches/mj-nKWYkE

import { Particle } from '../main/particles/Particle';
import { Rectangle } from './Rectangle';


export class QuadTreePoint{
  rect: Rectangle;
  x:number = 0;
  y:number = 0;
  r:number = 40;
  idx:number = 0;
  p:Particle;

  constructor(x:number, y:number, idx:number,p:Particle){
    this.idx = idx;
    this.x = x;
    this.y = y;
    this.r = 40;
    this.p = p;
  }

  //交差してるかどうか
  /*
  intersects(other:QuadTreePoint) {
    
    //let d = dist(this.x, this.y, other.x, other.y);
    let dx = (this.x - other.x);
    let dy = (this.y - other.y);
    let rr = this.r + other.r;
    return ( dx*dx+dy*dy < rr*rr );

  }*/

}