import p5 from 'p5';
import * as THREE from 'three';
import { MyGUI } from './MyGUI';
import { GUI } from 'lil-gui';
import { Colors } from './Colors';
import { Vector3 } from 'three';
import { SRandom } from '../../main/data/SRandom';



export class Params{

    static gui      :GUI;
    static NUM_DOTS     :number=150;
    static radius       :number=40;
    static radius2      :number=10;
    static strength     :number=0.8;
    static strength2    :number=1;
    static masatsu      :number=0.9;
    static logoScale    :number=2.6;
    static OUTSIDE_POS  :Vector3=new Vector3(999,999,999);
    static SVG_SCALE    :number=2;
    static numEmitting      :number=4;
    static intervalEmitting :number=10;
    static bgColor: { r: number; g: number; b: number; } = {r:0.7,g:0.7,b:0.6};

    static FILTER_FLIPFLOP  : THREE.TextureFilter = THREE.LinearFilter;
    static FILTER_DRAW      : THREE.TextureFilter = THREE.LinearFilter;
    static UPDATE_DISTANCE  : number=5;

    public static PATH:string = "";
    public static USER_NAME:string="";
    public static USER_HASH:string="";
    public static USER_TIME:number=0;
    public static maxLimit: number = 400;
    
    public static DOM_WEBGL="mainvisual_webgl";
    public static DOM_TITLE="mainvisual_title"
    public static DOM_JS="mainvisual_js"

    // Getter宣言
    public static get bgColorHex(): number {
        return (Params.bgColor.r*255 << 16) + (Params.bgColor.g*255 << 8) + Params.bgColor.b*255;
    }
 
    static init(){

        const webgl = document.getElementById(this.DOM_JS);
        this.PATH = webgl.dataset.baseurl+"img/"
        console.log(webgl);
        console.log("this.PATH",this.PATH);

        /*
        var attribute = {
            hash: "0x115044fc9f4b40dc9d4971a9e5c8a5863bd4ef7ccdd30db4f4ca04786457f88c",
            name: "PoX太郎",
            mintedAt: 1681036222612
        };
        */
        let win:any = window;
        Params.USER_NAME = win.attribute.name;
        Params.USER_HASH = win.attribute.hash;
        Params.USER_TIME = win.attribute.mintedAt;
        console.log("Params.USER_NAME",Params.USER_NAME);
        console.log("Params.USER_HASH",Params.USER_HASH);
        console.log("Params.USER_TIME",Params.USER_TIME);

        SRandom.init(Params.USER_HASH);

        let rr = SRandom.random();
        if(rr<0.33){
            Params.numEmitting      =30;
            Params.intervalEmitting =30;
        }else if(rr<0.66){
            Params.numEmitting      =15;
            Params.intervalEmitting =10;
        }else{
            Params.numEmitting      =1;
            Params.intervalEmitting =1;
        }


        MyGUI.Init();

        let rand = SRandom.random();
        if(rand<0.333){
            this.bgColor.r = 255/255;
            this.bgColor.g = 220/255;
            this.bgColor.b = 255/255;
        }else if(0.666){
            this.bgColor.r = 220/255;
            this.bgColor.g = 255/255;
            this.bgColor.b = 255/255;
        }else{
            this.bgColor.r = 255/255;
            this.bgColor.g = 255/255
            this.bgColor.b = 220/255
        }

        this.gui = MyGUI.gui;
        Colors.init();

        //if(SRandom.random()<0.5){
        //    this.numEmitting = 5;
        //}else{
            //this.numEmitting = 20;
            //this.intervalEmitting = 10;
        //}


        this.masatsu = 0.0;//0.5 + 0.4 * SRandom.random();
        let ran = SRandom.random(); 


        if(ran<0.5){
            this.masatsu=0.6;
        }else{
            this.masatsu=0.9;
        }


        this.radius=40+SRandom.random()*20;
        this.radius2=10+SRandom.random()*10;
        this.strength=0.8+SRandom.random()*0.2;
        this.strength2=0.9+SRandom.random()*0.2;

        //パーティクルのパラメータ
        let g = this.gui.addFolder("== Particles ==");
            g.close();
            g.add(Params,"radius",0,200).listen();
            g.add(Params,"radius2",0,200).listen();
            g.add(Params,"strength",0,10).listen();
            g.add(Params,"strength2",0,10).listen();
            g.add(Params,"masatsu",0,1).listen();
            g.add(Params,"numEmitting",1,40).step(1).listen();
            g.add(Params,"intervalEmitting",1,40).step(1).listen();
            g.add(Params,"UPDATE_DISTANCE",0,50).listen();
            g.add(Params,"maxLimit",0,400).listen();
    }



}