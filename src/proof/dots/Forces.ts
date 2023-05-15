//import { Particle } from '../../main/particles/Particle';
//import { PDot } from './PDot';
import { Params } from '../data/Params';
import { MyGUI } from '../data/MyGUI';
import { SRandom } from '../../main/data/SRandom';



export class Forces{


    private static forces: { [name: string]: number } = {};
    public static NUM:number = 200;

    public static ALONE:number = 0.1

    public static init(){
        
        Forces.reset();
        Forces.ALONE=0.5*SRandom.random();
        Params.gui.add(Forces,"reset").name("reset force")
        Params.gui.add(Forces,"ALONE",0,1).listen();
        
    }

    public static reset(){
        //AとB
        let num = Forces.NUM;
        
        //Forces.ALONE=alone;

        for(let i = 0; i < num; i++){
            for(let j = 0; j < num; j++){

                if(SRandom.random()<Forces.ALONE){
                    this.forces[i+"_"+j] = -0.1-0.4*SRandom.random();
                }else{
                    this.forces[i+"_"+j] = SRandom.random()-0.5;
                }

            }
        }

    }

    /*
    public static getForce(p1:PDot,p2:PDot):number{

        return this.forces[p1.type+"_"+p2.type];

    }*/


}
