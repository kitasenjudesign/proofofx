//https://kitasenjudesign.hatenablog.com/entry/2020/05/15/185214\
//https://editor.p5js.org/kitasenjudesign/sketches/mj-nKWYkE

import { Particle } from '../main/particles/Particle';
import { QuadTreePoint } from './QuadTreePoint';
import { Rectangle } from './Rectangle';

export class QuadTreeCircle {

    x:number;
    y:number;
    r:number;
    rSquared:number;

    constructor(x:number, y:number, r:number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
      }
    
      //そのポイントを含んでいるか
      contains(point:QuadTreePoint) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let dx = (point.x - this.x);
        let dy = (point.y - this.y);
        let d = dx*dx+dy*dy;
        return d <= this.rSquared;
      }
    
      //交差する
      intersects(range:Rectangle) {
    
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);
    
        // radius of the circle
        let r = this.r;
    
        let w = range.w;
        let h = range.h;
        let dx = (xDist - w);
        let dy = (yDist - h);
        //let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
        let edges = dx*dx + dy*dy;

        // no intersection
        if (xDist > (r + w) || yDist > (r + h))
          return false;
    
        // intersection within the circle
        if (xDist <= w || yDist <= h)
          return true;
    
        // intersection on the edge of the circle
        return edges <= this.rSquared;
      }
    

    
}