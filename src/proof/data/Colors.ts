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

        let gui = Params.gui.addFolder("== Colors ==");
        gui.close();
        this.colors=[];
        this.colorsObj={};

        for(let i=0;i<4;i++){

            let cc = new Color(0xffffff);
            cc.setHSL(
                0,0,0
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

        this.logoColor={
            r:this.colorsObj["col_0"].r,
            g:this.colorsObj["col_0"].g,
            b:this.colorsObj["col_0"].b
        };

        Colors.logoColorObj={};
        Colors.logoColorObj["logo"] = this.logoColor;

        gui.addColor(Colors.logoColorObj,"logo").listen();
        //gui.addColor(Colors.logoColor,"logoColor").listen();
        gui.add(Colors,"NUM");
        gui.add(Colors,"reset");

        //this.reset();

    }

    public static reset(){

        Colors.NUM = Math.floor( 2 + 2 * SRandom.random() );

        //this.logoColor.r = 0.5+0.5*SRandom.random();
        //this.logoColor.g = 0.5+0.5*SRandom.random();
        //this.logoColor.b = 0.5+0.5*SRandom.random();

        let startCol = SRandom.random();


        for(let i=0;i<this.NUM;i++){

            let col = this.colors[i];
            let hsl = new Color(0xffffff);
            hsl.setHSL(
                startCol+i/this.NUM*0.5,
                0.8,
                0.5
            );

            col.r = hsl.r;
            col.g = hsl.g;
            col.b = hsl.b;

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

        return this.colors[Math.floor(SRandom.random()*this.NUM)];

    }

}
