import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { OutputPlane } from './OutputPlane';
import { Params } from '../../proof/data/Params';
import { BrushScene } from './BrushScene';
import { BlurScene } from './BlurScene';
import { PigmentScene } from './PigmentScene';
import { LastCalcScene } from './LastCalcScene';



export class RTTMain extends THREE.Object3D{

    outputPlane     :OutputPlane;
    brushScene      :BrushScene;
    blurScene       :BlurScene;
    pigmentScene    :PigmentScene;
    lastCalcScene   :LastCalcScene;

    options         :any;


    constructor(webglRenderer:WebGLRenderer,callback:()=>void){

        super();

        this.outputPlane = new OutputPlane();
        this.outputPlane.position.set(0,0,-10)
        this.add(this.outputPlane);
        
        setTimeout(()=>{
            this.brushScene     = new BrushScene();
        },100);
        setTimeout(()=>{
            this.blurScene      = new BlurScene(webglRenderer);
        },200);
        setTimeout(()=>{
            this.pigmentScene   = new PigmentScene(webglRenderer);
        },300);
        setTimeout(()=>{
            this.lastCalcScene  = new LastCalcScene(webglRenderer);
        },400);
        setTimeout(()=>{
            callback();
        },500);
        
        this.options = { output: 'last' }
        Params.gui.add( this.options, 'output', [ 'input','blur', 'color', 'last' ] )

        //Params.gui.add( this, "resetAll")
        //gui.add( this.options, 'speed', { Slow: 0.1, Normal: 1, Fast: 5 } )
 
    }

    init(){
        //this.rttScene.init();
    }

    update(w:WebGLRenderer){
    
        this.brushScene.update(w);
        this.blurScene.update(
            w,
            this.brushScene.renderTarget.texture
        );
        this.pigmentScene.update(
            w,
            this.brushScene.renderTarget.texture,
            this.blurScene.getTex()
        );
        this.lastCalcScene.update(
            w,
            this.pigmentScene.getTex(),
            this.blurScene.getTex()
        );

        switch(this.options.output){

            case 'input':
                this.outputPlane.setTex(this.brushScene.renderTarget.texture);//最終出力
                this.outputPlane.setTex2(null);
                
                break;
            case 'color':
                this.outputPlane.setTex(this.pigmentScene.getTex());
                this.outputPlane.setTex2(null);
                break;
            case 'blur':
                this.outputPlane.setTex(this.blurScene.getTex());
                this.outputPlane.setTex2(null);
                break;
            case 'last':
                this.outputPlane.setTex(this.lastCalcScene.getTex());//最終出力
                this.outputPlane.setTex2(this.pigmentScene.getTex());
                break;

        }
        this.outputPlane.update();

    }


    resetAll(){
        
        this.brushScene.reset();
        this.blurScene.clearTargets();
        this.pigmentScene.clearTargets();
        this.lastCalcScene.clearTargets();

    }


    resize(camera:OrthographicCamera){
        
        this.outputPlane?.resize(
            Params.stageWidth/100,
            Params.stageHeight/100
        )
        
        this.brushScene?.resize(camera);
        this.blurScene?.resize(camera);
        this.pigmentScene?.resize(camera);
        this.lastCalcScene?.resize(camera);
        
    }


}