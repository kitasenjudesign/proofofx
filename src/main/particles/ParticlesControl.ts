import * as THREE from 'three';
import { Particle } from './Particle';
import { Forces } from './Forces';
import { PLifeCalc } from './PLifeCalc';
import { IntersectionLine } from '../intersection/IntersectionLine';
import { DataManager } from '../data/DataManager';
import { Particles } from './Particles';
import { Params } from '../../proof/data/Params';

//particleをコントロールする
export class ParticleControl extends THREE.Object3D{

    particleMain :Particles;
    particles          :Particle[];
    line             :IntersectionLine;
    points           :THREE.Points;
    //dummy            :THREE.Object3D;
    calc             :PLifeCalc;
    frameCount            :number = 0;
    particleIndex            :number = 0;
    //control          :ParticleControl;

    showingMode:string = "line"

    constructor(){
        super();
    }

    init(p:Particles){
        
        this.particleMain=p;
        this.particles=p.particles;
        this.line = p.line;

        this.calc = new PLifeCalc();
        this.calc.init(this.particles);

    }


    reset(){
        this.line.reset();
    }


    update(){

        

        
        //順にshowしていく

        if(this.showingMode=="line"){
            this.line.updateY();
            if(this.frameCount%Params.intervalEmitting==0){
                let intesection = DataManager.getInstance().instersection;
                for(let i=0;i<Params.numEmitting;i++){
                    let point = intesection.GetCurrentRandomPoint();
                    if(point){
                        this.particles[(this.frameCount+i)%this.particles.length].show(point);    
                    }
                }
            }
        }else{
            for(let i=0;i<Params.numEmitting;i++){
                let point = DataManager.getInstance().svg.getNextPoint();
                this.particles[(this.frameCount+i)%this.particles.length].show(
                    new THREE.Vector2(point.x,point.y)
                ); 
            }
        }
        

        

        //動きの計算,quadtreeの更新
        if(this.frameCount%3==0) this.calc.calcQtree(this.particles);
        this.calc.calcMotion(this.particles);

        this.frameCount++;


        //軌跡の更新
        for(let i=0;i<this.particles.length;i++){            
            this.particles[i].update();
        }

    }

}