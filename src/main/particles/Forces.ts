import { SRandom } from '../data/SRandom';
import { Particle } from './Particle';



export class Forces{


    private static forces: { [name: string]: number } = {};
    public static NUM:number = 300;



    public static init(){
        
        //AとB
        let num = Forces.NUM;

        for(let i = 0; i < num; i++){
            for(let j = 0; j < num; j++){

                if(SRandom.random()<0.3){
                    this.forces[i+"_"+j] = -0.1;
                }else{
                    this.forces[i+"_"+j] = SRandom.random()-0.5;

                }

            }
        }

    }


    public static getForce(p1:Particle,p2:Particle):number{

        return this.forces[p1.type+"_"+p2.type];

    }


}
