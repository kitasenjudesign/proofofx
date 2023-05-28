import * as THREE from 'three';
import { Particle } from './Particle';
import { Forces } from './Forces';
import { PLifeCalc } from './PLifeCalc';
import { IntersectionLine } from '../intersection/IntersectionLine';
import { DataManager } from '../data/DataManager';
import { Particles } from './Particles';
import { Params } from '../../proof/data/Params';
import { ParticlesBase } from './ParticlesBase';

//particleをコントロールする
export class ParticleControl extends THREE.Object3D{

    particleMain        :ParticlesBase;
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

    init(p:ParticlesBase){
        
        this.particleMain=p;
        this.particles=p.particles;
        this.line = p.line;

        this.calc = new PLifeCalc();
        this.calc.init(this.particles);

        this.line.tweenY();
    }

    pause(){
        this.line.pause();
    }

    reset(){
        this.line.reset();
        
    }


    update(){

    
        //順にshowしていく

        if(this.showingMode=="line"){
            
            this.line.updateY();
            if(this.frameCount%Params.intervalEmitting==0){
                this.line.updateCrossPoints();
                let intesection = DataManager.getInstance().instersection;

                let crossPoints = intesection.GetCurrentCrossPoints();

                //for(let i=0;i<crossPoints.length;i+=Params.numMabiki){

                let idx = 0;
                if(crossPoints.length>0){
                    while(true){
                        let p = crossPoints[idx];
                        if(p){
                            this.particles[
                                this.particleIndex%this.particles.length
                            ].show(p);    
                            this.particleIndex++;
                        }
                        idx+=Params.numMabiki;
                        if(idx>=crossPoints.length) break;
                    }    
                }
                //}

                /*
                for(let i=0;i<Params.numEmitting;i++){
                    let point = intesection.GetCurrentRandomPoint();
                    if(point){
                        this.particles[this.particleIndex%this.particles.length].show(point);    
                        this.particleIndex++;
                    }
                }*/

            }
        }else{
            /*
            for(let i=0;i<Params.numEmitting;i++){
                let point = DataManager.getInstance().svg.getNextPoint();
                this.particles[(this.frameCount+i)%this.particles.length].show(
                    new THREE.Vector2(point.x,point.y)
                ); 
            }*/
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