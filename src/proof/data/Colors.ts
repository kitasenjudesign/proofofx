import { Color } from "three";
import { Params } from "./Params";
import { SRandom } from "../../main/data/SRandom";
import { LabColor } from "./LabColor";


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
            //let hsl = new Color(0xffffff);
            
            let amp = 120;
            let rad = (startCol+i/this.NUM*0.5)*2*Math.PI;
            let hsl = this.labToRgb(
                50+30*SRandom.random(),
                amp*Math.cos(rad),
                amp*Math.sin(rad)
                /*
                50,
                -100+200*SRandom.random(),
                -100+200*SRandom.random()
                */
            );

            
            /*
            hsl.setHSL(
                startCol+i/this.NUM*0.5,
                0.8,
                0.5
            );*/

            //このコードでは、
            //Lが0〜100、
            //aとbがおおよそ-128〜127の範囲のLAB値を想定しています。
            //RGBは0〜255の範囲の整数値を返します。
            
            /*
            let rr=(startCol+i/this.NUM*0.5)*2*Math.PI;
            let lab = this.labToRgb(
                50,
                128*Math.cos(rr),
                128*Math.sin(rr)
            );*/

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

    
    
    static labToRgb(l:number, a:number, b:number):{r:number,g:number,b:number} {
        // Step 1: LAB to XYZ
        let y = (l + 16) / 116;
        let x = a / 500 + y;
        let z = y - b / 200;

        [x, y, z] = [x, y, z].map(v => {
            return Math.pow(v, 3) > 0.008856 ? Math.pow(v, 3) : (v - 16 / 116) / 7.787;
        });

        // D65 standard referent
        x *= 0.95047;
        y *= 1.00;
        z *= 1.08883;

        // Step 2: XYZ to RGB
        let [rr, gg, bb] = [3.2406 * x - 1.5372 * y - 0.4986 * z,
                    -0.9689 * x + 1.8758 * y + 0.0415 * z,
                    0.0557 * x - 0.2040 * y + 1.0570 * z];

        // assume sRGB
        [rr, gg, bb] = [rr, gg, bb].map(v => {
            return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
        });

        return {r:rr,g:gg,b:bb};
    }
    

}
