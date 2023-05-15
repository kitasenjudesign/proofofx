//線分
import * as THREE from 'three';
import { Vector3 } from 'three';
import { SRandom } from '../data/SRandom';

export class LineSeg {

    start:THREE.Vector2;
    end:THREE.Vector2;
    static randoms:number[] = [];


    constructor(
        sx:number,
        sy:number,
        ex:number,
        ey:number
    ){
        
        if(LineSeg.randoms.length==0){
            for(let i=0;i<10;i++){
                LineSeg.randoms.push(
                    SRandom.random()
                );
            }    
        }
        
        this.start = new THREE.Vector2(sx,sy);
        this.end =  new THREE.Vector2(ex,ey);

    }

    init(){

        

    }

    /**
     * @param line1 
     * @param line2 
     * @returns 
     */
    public static GetIntersectionLineSegments(
        line1:LineSeg, line2:LineSeg
    ):THREE.Vector2 {

        let x0 = line1.start.x,
            y0 = line1.start.y,
            x1 = line1.end.x,
            y1 = line1.end.y,
            x2 = line2.start.x,
            y2 = line2.start.y,
            x3 = line2.end.x,
            y3 = line2.end.y;

        //0が発生しないように
        let amp = 0.05;//0.01
        x0+=(this.randoms[0]-0.5)*amp;
        y0+=(this.randoms[1]-0.5)*amp;
        x1+=(this.randoms[2]-0.5)*amp;
        y1+=(this.randoms[3]-0.5)*amp;
        x2+=(this.randoms[4]-0.5)*amp;
        y2+=(this.randoms[5]-0.5)*amp;
        x3+=(this.randoms[6]-0.5)*amp;
        y3+=(this.randoms[7]-0.5)*amp;
        

        let a0 = (y1 - y0) / (x1 - x0),
            a1 = (y3 - y2) / (x3 - x2);

        let x = (a0 * x0 - y0 - a1 * x2 + y2) / (a0 - a1),
            y = (y1 - y0) / (x1 - x0) * (x - x0) + y0;

	    if (Math.abs(a0) === Math.abs(a1)) return null;//交点なし

        if (x > Math.max(x0, x1) || x > Math.max(x2, x3) ||
            y > Math.max(y0, y1) || y > Math.max(y2, y3) ||
            x < Math.min(x0, x1) || x < Math.min(x2, x3) ||
            x < Math.min(x0, x1) || y < Math.min(y2, y3) ) return null;//交点なし

        return new THREE.Vector2(x,y);

    };



}
