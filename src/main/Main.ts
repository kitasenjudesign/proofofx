import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { TorusGeometry, MeshPhongMaterial, DirectionalLight, MeshBasicMaterial, Line, BoxGeometry } from 'three';
import { Particles } from './particles/Particles';
import { DataManager } from './data/DataManager';
import { RTTMain } from './rtt/RTTMain';
import { Params } from '../proof/data/Params';
import { DOMControl } from '../dom/DOMControl';
import { Xorshift } from './data/Xorshift';
import { SRandom } from './data/SRandom';


export class Main{

    renderer:THREE.WebGLRenderer;
    scene:THREE.Scene;
    camera:THREE.OrthographicCamera;
    stats:Stats;
    isDebug:boolean;
    isPause:boolean=false;
    clock:THREE.Clock;
    //line2:Line2;
    particles:Particles;
    control: OrbitControls;
    rttMain:RTTMain;
    domControl:DOMControl;

    init(){
       // let svgLoader = new SVGLo
        Params.init();
        /*
        let r = new Xorshift(
            "0x115044fc9f4b40dc9d4971a9e5c8a5863bd4ef7ccdd30db4f4ca04786457f88c"
        );
        console.log(r.nextFloat());
        console.log(r.nextFloat());
        console.log(r.nextFloat());*/
        


        let dataManager = DataManager.getInstance();
        dataManager.init(()=>{
            this.init2();
        });

    }

    init2(){

        this.clock = new THREE.Clock(true);
        this.clock.start();
     
         this.renderer = new THREE.WebGLRenderer({
             canvas: document.getElementById(Params.DOM_WEBGL),
             antialias: false,
             preserveDrawingBuffer : true
         });

        //console.log(hoge);
        this.scene = new THREE.Scene();

        this.rttMain = new RTTMain(()=>{
            this.init3();
        });
        this.scene.add(this.rttMain);

    }

    init3(){
        this.particles= new Particles();
        this.particles.init();
        this.scene.add(this.particles);

        DataManager.getInstance().particles=this.particles;
        this.rttMain.init();

        this.scene.add(
            DataManager.getInstance().svg.logo2
        );

        this.renderer.setPixelRatio(1);
        this.renderer.setClearColor(new THREE.Color(0xcccccc));
        this.renderer.setSize(window.innerWidth,window.innerHeight);
         
        this.camera = new THREE.OrthographicCamera(
            -window.innerWidth/2, 
            window.innerWidth/2, 
            window.innerHeight/2, 
            -window.innerHeight/2, 
            1, 3000
        );
        //this.camera = new THREE.PerspectiveCamera(20, 640/480, 1, 10000);
        
        this.domControl = new DOMControl();
        DataManager.getInstance().domControl = this.domControl;

        this.camera.position.set(0,0,1000); 
                
         window.addEventListener('resize', ()=>{
            this.onWindowResize();
         }, false)
         this.onWindowResize();

         let d:DirectionalLight = new DirectionalLight(0xffffff);
         d.position.x = 10;
         d.position.y = 10;
         this.scene.add(d);
        this.control = new OrbitControls(this.camera, this.renderer.domElement);

        this.tick();
        
        Params.gui.add(this, "pause");
        Params.gui.add(this, "download");
        Params.gui.add(this, "resetParticles").name("reset particles");
        Params.gui.add(this, "reset").name("reset all");

    }

    resetParticles(){
        this.particles.reset();     
    }

    reset(){
        this.particles.reset();
        this.rttMain.resetAll();
    }


    download(){
        
        let dom = document.getElementById(Params.DOM_WEBGL) as HTMLCanvasElement;
        let link = document.createElement('a');
        link.href = dom.toDataURL('image/png');

        let date = new Date(); // 現在の日時を取得
        let y = date.getFullYear().toString().slice(-2); // 年を2桁にして取得
        let m = ("0" + (date.getMonth() + 1)).slice(-2); // 月を2桁にして取得
        let d = ("0" + date.getDate()).slice(-2); // 日を2桁にして取得
        let h = ("0" + date.getHours()).slice(-2); // 時を2桁にして取得
        let i = ("0" + date.getMinutes()).slice(-2); // 分を2桁にして取得
        let s = ("0" + date.getSeconds()).slice(-2); // 秒を2桁にして取得
        let dateString = y + m + d + "_" + h + i + s; // 日付文字列を作成

        link.download = dateString+'.png'
        link.click()
        
    }


    pause(){
        this.isPause = !this.isPause;
        if(!this.isPause){
            this.tick()
        }
    }

    tick(){
        if(this.isPause)return;

        //this.domControl.update();

        DataManager.getInstance().svg.update();
        this.control.update();
        this.particles.update();
        this.rttMain.update( this.renderer );

        this.renderer.render(this.scene, this.camera);    
        window.requestAnimationFrame(()=>{
            this.tick();
        });

    }


    onWindowResize(){

        //const fovRad = (this.camera.fov / 2) * (Math.PI / 180);//角度
        //let distance = (window.innerHeight / 2) / Math.tan(fovRad);//距離
        this.camera.position.set(0,0,1000);//距離を指定
        this.camera.left = -window.innerWidth/2, 
        this.camera.right = window.innerWidth/2, 
        this.camera.top = window.innerHeight/2, 
        this.camera.bottom = -window.innerHeight/2, 
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight);
       
        this.rttMain.resize(this.camera);
        this.particles.resize();
    }

}