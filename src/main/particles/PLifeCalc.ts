import { Particle } from './Particle';
import { Forces } from './Forces';
import { QTreeMain } from '../../quadtree/QTreeMain';
import { QuadTreePoint } from '../../quadtree/QuadTreePoint';
import { Rectangle } from '../../quadtree/Rectangle';
import { Params } from '../../proof/data/Params';


export class PLifeCalc{

    private _quadTree   :QTreeMain;
    private _points     :QuadTreePoint[] = [];

    constructor(){
    }


    public init(particles:Particle[]){
        

        this._quadTree = new QTreeMain();
        this._points = [];
        for(let i=0;i<particles.length;i++){
            let p = particles[i];
            this._points.push(p.qPoint);            
        }
        //console.log(particles);
        //console.log(this._points);
        
    }


    //まずポイントだけ計算する

    public calcQtree(particles:Particle[]):Particle[]{

        //quadtreeに使うデータをコピー
        for(let i=0;i<particles.length;i++){
            this._points[i].x = particles[i].position.x;
            this._points[i].y = particles[i].position.y;
        }

        //quadtree更新
        this._quadTree.updateQtree(
            this._points,
            new Rectangle(0,0,window.innerWidth,window.innerHeight)
        );
        //console.log(this._quadTree);

        for(let i=0;i<particles.length;i++){

            let p1 = particles[i];
            if(!p1.visible) continue;

            let pp = this._quadTree.getPoint(
                p1.position.x,
                p1.position.y,
                40
            );

            p1.neighbors = pp;

        }

        return particles;

    }

    public calcMotion(particles:Particle[]):Particle[]{
        
        let radius      = Params.radius;
        let radius2     = Params.radius2;
        let radiusSq    = radius * radius;
        let radius2Sq   = radius2 * radius2;

        for(let i=0;i<particles.length;i++){

            let p1 = particles[i];
            if(!p1.visible) continue;

            let numView = 0;
            let vx:number = 0;
            let vy:number = 0;

            let numView2 = 0;
            let vx2:number = 0;
            let vy2:number = 0;

            let pp = p1.neighbors;

            if(pp){
                for(let j=0;j<pp.length;j++){
                    let p2 = pp[j].p;
                    if(p1==p2)continue;
    
                    let dx = p1.position.x - p2.position.x;//他へ向かうベクトル
                    let dy = p1.position.y - p2.position.y;//他へ向かうベクトル
                    let dist = ( dx*dx+dy*dy );
                    
                    if(dist<radiusSq){
                        let scl = 1 - dist / (radiusSq);
                        let force = Params.strength*Forces.getForce(p1,p2);
                        vx += -dx * force * scl;
                        vy += -dy * force * scl;
                        numView++;
                    }
    
                    if(dist<radius2Sq){
                        let scl = 1 - dist / (radius2Sq);
                        vx2 += Params.strength*dx * scl;
                        vy2 += Params.strength*dy * scl;
                        numView2++;
                    }
                }
            }
            

            //console.log(i,numView,numView2);
            p1.vx*=Params.masatsu;
            p1.vy*=Params.masatsu;

            if(numView>0){
                p1.vx += vx/numView;
                p1.vy += vy/numView;
                //p1.position.x += vx/numView * 2;
                //p1.position.y += vy/numView * 2;
            }
            if(numView2>0){
                p1.vx += vx2/numView*1;
                p1.vy += vy2/numView*1;
                //p1.position.x += vx2/numView2 * 1;
                //p1.position.y += vy2/numView2 * 1;
            }
            
            //p1.vy+=-0.5;

            /*
            if(
                window.innerWidth/2<p1.position.x || 
                window.innerHeight/2<p1.position.y
            ){
                let cvx = p1.position.x;
                let cvy = p1.position.y;
                p1.vx += -Math.sign(cvx)*15;
                p1.vy += -Math.sign(cvy)*15
            }*/

            p1.position.x += p1.vx * p1.multiply;
            p1.position.y += p1.vy * p1.multiply;

            particles[i]=p1;

        }

        return particles;
    }


}