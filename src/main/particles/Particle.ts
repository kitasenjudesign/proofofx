import { type } from 'os';
import * as THREE from 'three';
import { MeshBasicMaterial, Vector3 } from 'three';
import { Forces } from './Forces';
import { Lines } from './Lines';
import { DataManager } from '../data/DataManager';
import { Lines2 } from './Lines2';
//import { Tail } from './Tail';
import { Brushes } from './brush/Brushes';
import { Colors } from '../../proof/data/Colors';
import { Params } from '../../proof/data/Params';
import { QuadTreePoint } from '../../quadtree/QuadTreePoint';
import { SRandom } from '../data/SRandom';

export class Particle{

    position: Vector3;
    type    : number = 0;
    vx      : number = 0;
    vy      : number = 0;
    vz      : number = 0;
    visible : boolean = false;
    positions   :Vector3[] = [];
    pastPos :Vector3;
    count   :number = 0;
    limit   :number = 0;
    //tail    :Tail;
    colR :number = 0;
    colG :number = 0;
    colB :number = 0;
    width:number = 0;
    index:number = 0;
    opacity:number = 1;
    multiply:number = 1;

    qPoint:QuadTreePoint;
    public neighbors: QuadTreePoint[];


    constructor(idx:number){
        
        if(SRandom.random()<0.1){
            this.multiply = 1+SRandom.random()*3;
        }

        this.index = idx;
        this.count = 0;
        //this.tail = new Tail();

        let col = Colors.getRandomColor();
        this.colR = col.r;
        this.colG = col.g;
        this.colB = col.b;

        this.opacity = SRandom.random();

        this.visible=false;
        this.width = 1+7*SRandom.random();
        if(SRandom.random()<0.1)this.width=1;

        this.qPoint = new QuadTreePoint(
            0,0,
            this.index,
            this
        );        
        this.position = new Vector3();
    }

    public show(point:THREE.Vector2){

        console.log("show > " + this.index)

        let col = Colors.getRandomColor();
        this.colR = col.r;
        this.colG = col.g;
        this.colB = col.b;
        
        this.limit = 10 + Params.maxLimit*Math.pow(SRandom.random(),2);

        //if(SRandom.random()<0.1)this.limit= 10 + Params.maxLimit*SRandom.random()/4;

        this.position.x=point.x+5*(SRandom.random()-0.5);
        this.position.y=point.y+5*(SRandom.random()-0.5);
        this.count = 0;
        this.type = Math.floor( Forces.NUM * SRandom.random());
        this.pastPos = this.position.clone();
        this.visible=true;
        
        this.vx = 2*(SRandom.random()-0.5);
        this.vy = 2*(SRandom.random()-0.5);

    }

    public reset(){
        
        this.visible=false;
        this.position.x=99999;
        this.position.y=99999;
        let t = Brushes.getInstance();
        t.connect(
            this.index,
            this.position,
            this.position,
            0,0,0,0,0,0
        );

    }


    public update(){

        //this.position.z=this.count;
        //this.qPoint.x = this.position.x;
        //this.qPoint.y = this.position.y;
        let brushes = Brushes.getInstance();

        if(!this.visible){
            brushes.connect(
                this.index,
                new Vector3(0,0,0),
                new Vector3(0,0,0),
                0,0,0,0,0,0
            );
            return;
        }

        this.count++;
        if(this.count>this.limit){
            this.visible=false;
            return;

            let svg = DataManager.getInstance().svg;
            let point = svg.getRandomPoint();
            //

            this.count=0;
            this.position.x=point.x;
            this.position.y=point.y;
            this.position.z=0;

            this.pastPos.x=this.position.x;
            this.pastPos.y=this.position.y;
            this.pastPos.z=0;            
            
            //this.position.x=99999;
            //this.position.y=99999;
            //this.position.z=99999;
            //return;
        }

        
        let dx = this.position.x - this.pastPos.x;
        let dy = this.position.y - this.pastPos.y;
        let dist = Params.UPDATE_DISTANCE;
        if(dx*dx+dy*dy>dist*dist){

            
            if(brushes){
                let rr = this.colR;//this.vx;//this.R
                let gg = this.colG;//this.vy;//this.G
                let bb = this.colB;
                //let rad = Math.atan2(this.vy,this.vx);
                //rr = 0.5+0.5*Math.cos(rad);
                //gg = 0.5+0.5*Math.sin(rad);
                //bb = 0;

                brushes.connect(
                    this.index,
                    this.position,
                    this.pastPos,
                    rr,
                    gg,
                    bb,//this.colB,
                    this.width,
                    this.count/this.limit,
                    this.opacity
                )
            }

            this.pastPos.x = this.position.x;
            this.pastPos.y = this.position.y;
            this.pastPos.z = this.position.z;
    
        }else{
            
            /*
            let t=Tails.getInstance();
            if(t){
                t.connect(
                    this.index,
                    new Vector3(999,999,999),
                    new Vector3(9999,9999,9999),
                    this.colR,
                    this.colG,
                    this.colB,
                    1
                )
            }*/
        }



    }


}