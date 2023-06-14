import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { OutputPlane } from './OutputPlane';
import { Params } from '../../proof/data/Params';
import { BrushScene } from './BrushScene';
import { BlurScene } from './BlurScene';
import { PigmentScene } from './PigmentScene';
import { LastCalcScene } from './LastCalcScene';
import { RTTMain } from './RTTMain';



export class RTTMainLyte extends RTTMain{

    outputPlane     :OutputPlane;
    brushScene      :BrushScene;
    blurScene       :BlurScene;
    pigmentScene    :PigmentScene;
    lastCalcScene   :LastCalcScene;

    options         :any;


    constructor(webglRenderer:WebGLRenderer,callback:()=>void){

        super(null,null);

        this.outputPlane = new OutputPlane();
        this.outputPlane.position.set(0,0,-10)
        this.add(this.outputPlane);
        
        setTimeout(()=>{
            this.brushScene     = new BrushScene();
        },100);
        setTimeout(()=>{
            this.brushScene.isClear=false;
            callback();
        },200);
        
        this.options = { output: 'input' }
        Params.gui.add( this.options, 'output', [ 'input','blur', 'color', 'last' ] )

        //Params.gui.add( this, "resetAll")
        //gui.add( this.options, 'speed', { Slow: 0.1, Normal: 1, Fast: 5 } )
    }

    init(){
        //this.rttScene.init();
    }

    override update(w:WebGLRenderer){
    
        this.brushScene.update(w);
        /*
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
        */

        switch(this.options.output){

            case 'input':
                this.outputPlane.setTex(this.brushScene.renderTarget.texture);//最終出力
                this.outputPlane.setTex2(null);
                
                break;

        }
        this.outputPlane.update();

    }


    override resetAll(){
        
        this.brushScene.reset();
        //this.blurScene.clearTargets();
        //this.pigmentScene.clearTargets();
        //this.lastCalcScene.clearTargets();
    }


    override resize(camera:OrthographicCamera){
        
        this.outputPlane?.resize(
            Params.stageWidth/100,
            Params.stageHeight/100
        )
        
        this.brushScene?.resize(camera);
    }


}