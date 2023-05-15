//https://kitasenjudesign.hatenablog.com/entry/2020/05/15/185214\
//https://editor.p5js.org/kitasenjudesign/sketches/mj-nKWYkE

import { QuadTreeCircle } from './QuadTreeCircle';
import { QuadTreePoint } from './QuadTreePoint';
import { Rectangle } from './Rectangle';



export class QuadTree{

    public northwest:QuadTree;
    public northeast:QuadTree;
    public southwest:QuadTree;
    public southeast:QuadTree;

    public boundary:Rectangle;//領域
    public divided:boolean;//分割されているか
    public points:QuadTreePoint[];//格納されている点
    public capacity:number;//格納できる点の数

    constructor(boundary:Rectangle, capacity:number) {
        if (!boundary) {
          throw TypeError('boundary is null or undefined');
        }
        if (!(boundary instanceof Rectangle)) {
          throw TypeError('boundary should be a Rectangle');
        }
        if (typeof capacity !== 'number') {
          throw TypeError(`capacity should be a number but is a ${typeof capacity}`);
        }
        if (capacity < 1) {
          throw RangeError('capacity must be greater than 0');
        }
        
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
      }
    
      //分割
      subdivide() {

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let ne = new Rectangle(x + w, y - h, w, h);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southwest = new QuadTree(sw, this.capacity);
    /*
        let ne = new Rectangle(x + w, y - h, w, h);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southwest = new QuadTree(sw, this.capacity);
    */
        this.divided = true;
      }
    
      //ポイントを追加
      insert(point:QuadTreePoint) {
        
        //矩形に含まれれなかったらfalse
        if (!this.boundary.contains(point)) {
          return false;
        }
    
        //矩形の中にあり、
        //キャパを超えてなかったらtrue
        if (this.points.length < this.capacity) {
          this.points.push(point);
          return true;
        }
    
        //キャパを超えてたら４分割
        if (!this.divided) {
          this.subdivide();
        }
    
        //その４分割でさらに再起的・入れ子を作っていく
        if (this.northeast.insert(point) || this.northwest.insert(point) ||
          this.southeast.insert(point) || this.southwest.insert(point)) {
          return true;
        }

      }
    
      //探したいrangeから点を探す
      query(range:QuadTreeCircle, found:QuadTreePoint[]=null):QuadTreePoint[] {

        if (!found) {
          found = [];
        }
    
        //rangeと矩形が交差してなかった
        if (!range.intersects(this.boundary)) {
          return found;
        }
    
        //現在の矩形の中にあるpointをfoundに追加
        //複数階層になっている
        var isHit=false;
        for (let p of this.points) {
          if (range.contains(p)) {
            //this.show(255,0,0);
            //console.log("hit")

            p.rect = new Rectangle(
              this.boundary.x,
              this.boundary.y,
              this.boundary.w,
              this.boundary.h
            )
            //console.log(p.rect)

            found.push(p);
            isHit=true;
          }
        }
        
        if(!isHit){
          //this.show(155,155,155);
        }
        
        //さらに分割された矩形であるかどうか探していく
        //foundに入る
        if (this.divided) {
          this.northwest.query(range, found);
          this.northeast.query(range, found);
          this.southwest.query(range, found);
          this.southeast.query(range, found);
        }
    
        return found;
      }
      

      show(rr:number,gg:number,bb:number) {
        //stroke(rr,gg,bb);
        //noFill();
        //strokeWeight(1);
        //rectMode(CENTER);
        //rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
      }

}
