import { Color } from "three";
import { Params } from "./Params";
import { SRandom } from "../../main/data/SRandom";


export class Colors {

    public static colors:{r:number,g:number,b:number}[];
    public static logoColor:{r:number,g:number,b:number};
    public static logoColorObj:{ [key: string]: any };
    public static colorsObj:{ [key: string]: any };
    public static NUM:number = 3;


    public static init(){

        Colors.NUM = Math.floor( 2 + 2 * SRandom.random() );

        let gui = Params.gui.addFolder("== Colors ==");
        gui.close();
        this.colors=[];
        this.colorsObj={};

        this.logoColor={
            r:SRandom.random(),
            g:SRandom.random(),
            b:SRandom.random()
        };

        

        for(let i=0;i<this.NUM;i++){

            let cc = new Color(0xffffff);
            cc.setHSL(
                SRandom.random(),
                0.5+0.5*SRandom.random(),//
                0.5//
            );

            let col = {
                r:cc.r,
                g:cc.g,
                b:cc.b
            };
            
            this.colorsObj["col_"+i] = col;
            this.colors.push(col);
            gui.addColor(this.colorsObj,"col_"+i).listen();

        }
        Colors.logoColorObj={};
        Colors.logoColorObj["logo"] = this.logoColor;
        gui.addColor(Colors.logoColorObj,"logo").listen();
        //gui.addColor(Colors.logoColor,"logoColor").listen();
        gui.add(Colors,"reset");

    }

    private static reset(){

        this.logoColor.r = 0.5+0.5*SRandom.random();
        this.logoColor.g = 0.5+0.5*SRandom.random();
        this.logoColor.b = 0.5+0.5*SRandom.random();

        for(let i=0;i<this.NUM;i++){

            let col = this.colors[i];
            col.r = SRandom.random();
            col.g = SRandom.random();
            col.b = SRandom.random();

        }
    }


    public static rgb2hex(rgb:{r:number,g:number,b:number}){

        let rr:number = Math.floor(rgb.r*255);
        let gg:number = Math.floor(rgb.g*255);
        let bb:number = Math.floor(rgb.b*255);
        let hex = ((rr << 16) | (gg << 8) | bb);
        return hex;

    }


    public static getRandomColor(){

        return this.colors[Math.floor(SRandom.random()*this.colors.length)];

    }

}
