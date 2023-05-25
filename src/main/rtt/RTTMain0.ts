import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { RTTSceneBase } from './RTTSceneBase';
import { OutputPlane } from './OutputPlane';
import { RTTScene } from './RTTScene';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { Lines2 } from '../particles/Lines2';
import { LastCalcScene } from './LastCalcScene';
import { Params } from '../../proof/data/Params';


export class RTTMain0 extends THREE.Object3D{


    outputPlane     :OutputPlane;
    rttScene        :RTTScene;
    rttScene2       :LastCalcScene;
    options         :any;

    constructor(renderer:WebGLRenderer){

        super();

        this.outputPlane = new OutputPlane();
        this.outputPlane.position.set(0,0,-10)
        this.add(this.outputPlane);
        
        this.rttScene = new RTTScene();
        this.rttScene2 = new LastCalcScene(renderer);


        
        this.options = { output: 'last' }
        //選択肢
        Params.gui.add( this.options, 'output', [ 'blur', 'color', 'last' ] )
        //gui.add( this.options, 'speed', { Slow: 0.1, Normal: 1, Fast: 5 } )
 

    }

    init(){
        this.rttScene.init();
    }

    update(w:WebGLRenderer){
    
        this.rttScene.update(w);
        this.rttScene2.update(
            w,
            this.rttScene.renderTargetC.texture,
            this.rttScene.getCurrentTexture()
        );

        switch(this.options.output){
            case 'color':
                this.outputPlane.setTex(this.rttScene.renderTargetC.texture);
                break;
            case 'blur':
                this.outputPlane.setTex(this.rttScene.getCurrentTexture());
                break;
            case 'last':
                this.outputPlane.setTex(this.rttScene2.getTex());//最終出力
                break;
        }
        // 
        //
        


    }


    resize(camera:OrthographicCamera){
        
        this.outputPlane.resize(
            Params.stageWidth/100,
            Params.stageHeight/100
        )
        this.rttScene.resize(camera);

    }


}