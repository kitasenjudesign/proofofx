//https://kitasenjudesign.hatenablog.com/entry/2020/05/15/185214\
//https://editor.p5js.org/kitasenjudesign/sketches/mj-nKWYkE

import { QuadTreeCircle } from './QuadTreeCircle';
import { QuadTreePoint } from './QuadTreePoint';
import { QuadTree } from './QuadTree';
import { Rectangle } from './Rectangle';

export class QTreeMain{

    private points:QuadTreePoint[];
    public qtree:QuadTree;

    constructor(){        
        
    }

    init(){

    }

    updateQtree(points:QuadTreePoint[],rootBoundary:Rectangle){
        
        //
        this.points = points;

        //一番ルートのrectangle
        let boundary = rootBoundary;
        //Quadtreeつくる、第２匹数は矩形内の限界数
        this.qtree = new QuadTree(boundary, 2);

        //ポイントを貯める
        for (let i=0;i<this.points.length;i++) {
            this.qtree.insert(this.points[i]);
        }

    }

    /**
     * 
     */
    public getPoint(xx:number,yy:number,rr:number):QuadTreePoint[]{

        let range = new QuadTreeCircle(
            xx,yy,rr
        );
        
        //周辺のポインツを検索する
        let points = this.qtree.query(range);
        return points;
            
    }


}