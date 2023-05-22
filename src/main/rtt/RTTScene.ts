import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { RTTSceneBase } from './RTTSceneBase';
import { Lines2 } from '../particles/Lines2';
import { DataManager } from '../data/DataManager';
import { Brushes } from '../particles/brush/Brushes';
import { Params } from '../../proof/data/Params';


export class RTTScene extends RTTSceneBase{

    //sphere      :THREE.Mesh;
    //lines       :Lines2;
    tails:Brushes;
    renderTargetC  :THREE.WebGLRenderTarget;
    isClearC:boolean = false;
    options:any;


    constructor(){
        super();

        this.tails = Brushes.getInstance();
        this.scene.add(this.tails);
        
        this.renderTargetC = new THREE.WebGLRenderTarget( 
            Params.stageWidth*1, 
            Params.stageHeight*1
        );
        this.renderTargetC.texture.generateMipmaps = false;

        //this.lines=new Lines2();
        //this.scene.add(this.lines);
        //let particles = DataManager.getInstance().particles.particles;
        /*
        for(let i=0;i<particles.length;i++){
            this.scene.add( particles[i].tail );
        }*/
        Params.gui.add(this,"isClearC");

   }

    init(){
        /*
        let particles = DataManager.getInstance().particles.particles;
        for(let i=0;i<particles.length;i++){
            this.scene.add( particles[i].tail );
        }*/
    }

    update(renderer:WebGLRenderer){

        //this.lines.update();
        this.tails.update();
        
        this.bgPlane.visible=true;
        
        super.update(renderer);

        //
        this.bgPlane.visible=false;        
        renderer.setRenderTarget(this.renderTargetC)
        renderer.autoClear=this.isClearC;
        renderer.setClearColor(0x000000,0.0);
        renderer.render(this.scene, this.camera);
        renderer.autoClear=true;
        renderer.setRenderTarget(null);
        //this.bgPlane.setDisplacementMap(this.renderTargetC.texture)
        
    }

    resize(camera:OrthographicCamera){
        super.resize(camera);
    }

}