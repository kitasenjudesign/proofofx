import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { BgPlane } from './BgPlane';
import { Params } from '../../proof/data/Params';



export class RTTSceneBase extends THREE.Object3D{

    scene   :Scene;
    renderTargetA  :THREE.WebGLRenderTarget;
    renderTargetB  :THREE.WebGLRenderTarget;
    mainRenderer:WebGLRenderer;

    camera  :OrthographicCamera;
    sizeRatio:number = 0.25;
    pingpoing:boolean = false;
    public bgPlane :BgPlane;
    //https://www.pentacreation.com/blog/2021/05/210504.html

    constructor(){
        super();        
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera();
        this.renderTargetA = new THREE.WebGLRenderTarget( 
            window.innerWidth*this.sizeRatio, 
            window.innerHeight*this.sizeRatio
        );
        this.renderTargetB = new THREE.WebGLRenderTarget( 
            window.innerWidth*this.sizeRatio, 
            window.innerHeight*this.sizeRatio
        );        
        
        /*
        this.renderTargetA.texture.minFilter = THREE.NearestFilter;
        this.renderTargetA.texture.magFilter = THREE.NearestFilter;
        this.renderTargetB.texture.minFilter = THREE.NearestFilter;
        this.renderTargetB.texture.magFilter = THREE.NearestFilter;
        */
        this.bgPlane = new BgPlane();
        this.bgPlane.position.z = -1;
        this.scene.add(this.bgPlane);

        //Params.gui.add(this,"clearTargets");
    }

    clearTargets(){
        this.mainRenderer.setClearColor(0x000000,1.0);
        this.mainRenderer.setRenderTarget(this.renderTargetA);
        this.mainRenderer.clear();
        this.mainRenderer.setRenderTarget(this.renderTargetB);
        this.mainRenderer.clear();
        this.mainRenderer.setRenderTarget(null);
    }

    getCurrentTexture():Texture{

        return this.pingpoing ? this.renderTargetA.texture : this.renderTargetB.texture;
    
    }

    update(renderer:WebGLRenderer){
        this.mainRenderer = renderer;
        this.bgPlane.update(
            this.pingpoing ? this.renderTargetB : this.renderTargetA
        )
        renderer.setRenderTarget(this.pingpoing ? this.renderTargetA : this.renderTargetB);
        renderer.setClearColor(0x000000,1.0);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);
        //renderer.autoClear=true;

        
        this.pingpoing = !this.pingpoing;
    }

    resize(camera:OrthographicCamera){

        //renderTarget
        this.renderTargetA.width   = window.innerWidth*this.sizeRatio;
        this.renderTargetA.height  = window.innerHeight*this.sizeRatio;
        this.renderTargetB.width   = window.innerWidth*this.sizeRatio;
        this.renderTargetB.height  = window.innerHeight*this.sizeRatio;

        this.camera.left    =camera.left;
        this.camera.right   =camera.right;
        this.camera.top     =camera.top;
        this.camera.bottom  =camera.bottom;
        
        //pos
        this.camera.position.copy(camera.position);
        this.camera.rotation.copy(camera.rotation);

        this.camera.updateProjectionMatrix();

        this.bgPlane.resize(
            window.innerWidth/100,
            window.innerHeight/100
        )

    }

}