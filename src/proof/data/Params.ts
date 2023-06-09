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

    static stageWidth:number = 0 ;
    static stageHeight:number = 0;

    static numMabiki      :number = 4;
    static intervalEmitting :number = 10;
    static bgColor: { r: number; g: number; b: number; } = {r:1,g:1,b:1};
    static bgColorAlpha:number = 0.5;
    static FILTER_FLIPFLOP  : THREE.TextureFilter = THREE.LinearFilter;
    static FILTER_DRAW      : THREE.TextureFilter = THREE.LinearFilter;
    static UPDATE_DISTANCE  : number=5;

    public static PATH:string = "";
    public static USER_NAME:string="";
    public static USER_HASH:string="";
    public static USER_ROLE:string="";
    public static USER_TIME:number=0;
    public static maxLimit: number = 400;
    public static widthRatio: number = 0.4;
    public static isMobile: boolean = false;

    public static DOM_WEBGL="mainvisual_webgl";
    public static DOM_TITLE="mainvisual_title"
    public static DOM_JS="mainvisual_js"

    public static MODE_NFT      :boolean=false;
    public static MODE_WEBSITE  :boolean=false;
    public static MODE_SQUIRE   :boolean=false;
    public static MODE_STAFF    :boolean=false;
    public static MODE_ARTIST   :boolean=false;
    public static MODE_LITE     :boolean=false;
    //public static MODE_STAFF    :boolean=false;

    // Getter宣言
    public static get bgColorHex(): number {
        return (Params.bgColor.r*255 << 16) + (Params.bgColor.g*255 << 8) + Params.bgColor.b*255;
    }
 
    static init(){

        Params.stageWidth = window.innerWidth;
        Params.stageHeight = window.innerHeight;
        this.initParams();
        SRandom.init(Params.USER_HASH);
        MyGUI.Init();

        this.gui = MyGUI.gui;
        Colors.init();
        this.setRandomParam();

        //パーティクルのパラメータ
        let g = this.gui.addFolder("== Particles ==");
            g.close();
            g.add(Params,"radius",0,200).listen();
            g.add(Params,"radius2",0,200).listen();
            g.add(Params,"strength",0,10).listen();
            g.add(Params,"strength2",0,10).listen();
            g.add(Params,"masatsu",0,1).listen();
            g.add(Params,"numMabiki",1,8).step(1).listen();
            g.add(Params,"intervalEmitting",1,40).step(1).listen();
            g.add(Params,"UPDATE_DISTANCE",0,50).listen();
            g.add(Params,"maxLimit",0,400).listen();
            g.add(Params,"widthRatio",0,1).listen();

    }

    public static forcedRandom(){        
        if(this.MODE_NFT)return;//NFTモードなら何もしない
        this.setRandomParam();
    }


    public static setRandomParam(){
        
        this.setRandomColor();
        this.setParticleParam();

    }

    
    public static initParams(){

        //DOM_JSにパスが書いてある
        const webgl = document.getElementById(Params.DOM_JS);
        Params.PATH = webgl.dataset.baseurl+"img/"
        Params.MODE_NFT = webgl.dataset.mode=="nft";//"nft","website","squire"
        Params.MODE_SQUIRE = webgl.dataset.mode=="squire";//"nft","website","squire"
        Params.MODE_WEBSITE = webgl.dataset.mode=="website";
        if(Params.MODE_SQUIRE){
            Params.stageWidth=Params.stageHeight;
        }

        let win:any = window;
        if(win.attribute==null){
            win.attribute = {
              //hash: "0x115044fc9f4b40dc9d4971a9e5c8a5863bd4ef7ccdd30db4f4ca04786457f88c",
              hash: ""+Math.random()+""+Math.random(),
              name: "PoX",
              mintedAt: 1681036222612,
              role: "",
            };
        }

        Params.USER_NAME = win.attribute.name;
        Params.USER_HASH = win.attribute.hash;
        Params.USER_TIME = win.attribute.mintedAt;
        Params.USER_ROLE = win.attribute.role;

        if(Params.USER_ROLE){
            Params.USER_ROLE = Params.USER_ROLE.toUpperCase();//大文字化
        }

        Params.MODE_STAFF = Params.USER_ROLE.indexOf("STAFF")>=0;
        Params.MODE_ARTIST = Params.USER_ROLE.indexOf("ARTIST")>=0;
        Params.MODE_LITE    =  win.attribute.lite ? true : false;//Params.MODE_NFT;//NFTモードならLiteモード

        console.log("Params.USER_NAME",Params.USER_NAME);
        console.log("Params.USER_HASH",Params.USER_HASH);
        console.log("Params.USER_TIME",Params.USER_TIME);
        console.log("Params.USER_ROLE",Params.USER_ROLE);

    }


    public static setParticleParam(){

        Params.intervalEmitting =3;
        Params.numMabiki=3;

        let ran = SRandom.random();
        if(ran<0.333)Params.numMabiki = 2;
        else if(ran<0.666)Params.numMabiki = 3;
        else Params.numMabiki = 5;//少ない

        this.masatsu = 0.8+0.05*SRandom.random();//0.8+0.2*SRandom.random();
        this.radius=50;//40+SRandom.random()*20;
        this.radius2=20;//12;//10+SRandom.random()*10;
        this.strength=0.8;//0.8+SRandom.random()*0.3;
        this.strength2=0.9;//0.9+SRandom.random()*0.2;
        //this.widthRatio = SRandom.random()*0.6+0.4;

    }

    /**
     * 
     */
    public static setRandomColor(){

        Colors.reset();

        let rand = SRandom.random();
        if(rand<0.333){
            this.bgColor.r = 255/255;
            this.bgColor.g = 240/255;
            this.bgColor.b = 255/255;
        }else if(rand<0.666){
            this.bgColor.r = 240/255;
            this.bgColor.g = 255/255;
            this.bgColor.b = 255/255;
        }else{
            this.bgColor.r = 255/255;
            this.bgColor.g = 255/255
            this.bgColor.b = 240/255
        }

        
        if(Params.MODE_STAFF || Params.MODE_ARTIST){
            this.bgColor.r = 245/255;
            this.bgColor.g = 245/255;
            this.bgColor.b = 245/255;
        }
        
    }


}