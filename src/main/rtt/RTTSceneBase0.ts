import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { Params } from '../../proof/data/Params';



export class RTTSceneBase0 extends THREE.Object3D{

    scene   :Scene;
    renderTarget  :THREE.WebGLRenderTarget;
    camera  :OrthographicCamera;
    sizeRatio:number = 1;
    //https://www.pentacreation.com/blog/2021/05/210504.html

    constructor(){
        super();        
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera();
        this.renderTarget = new THREE.WebGLRenderTarget( 
            Params.stageWidth*this.sizeRatio, 
            Params.stageHeight*this.sizeRatio
        );
        //this.renderTarget.texture.minFilter = THREE.NearestFilter;
        //this.renderTarget.texture.magFilter = THREE.NearestFilter;
        
    }

    update(renderer:WebGLRenderer){

        renderer.setRenderTarget(this.renderTarget);
        //renderer.setClearColor()
        renderer.autoClear=false;
        renderer.setClearColor(0x888888,1.0);
        renderer.render(this.scene, this.camera);
        
        renderer.setRenderTarget(null);
        renderer.autoClear=true;

    }

    resize(camera:OrthographicCamera){

        //renderTarget
        this.renderTarget.width   = Params.stageWidth*this.sizeRatio;
        this.renderTarget.height  = Params.stageHeight*this.sizeRatio;

        this.camera.left    =camera.left;
        this.camera.right   =camera.right;
        this.camera.top     =camera.top;
        this.camera.bottom  =camera.bottom;
        
        //pos
        this.camera.position.copy(camera.position);
        this.camera.rotation.copy(camera.rotation);

        this.camera.updateProjectionMatrix();


    }

}