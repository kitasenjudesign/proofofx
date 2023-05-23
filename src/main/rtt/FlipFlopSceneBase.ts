import * as THREE from 'three';
import { Scene, OrthographicCamera, WebGLRenderer, Vector3, MeshBasicMaterial, SphereGeometry, TorusGeometry, Texture } from 'three';
import { Params } from '../../proof/data/Params';


export class FilpFlopSceneBase{

    scene                 :Scene;
    camera                :OrthographicCamera;
    renderTarget1         :THREE.WebGLRenderTarget;
    renderTarget2         :THREE.WebGLRenderTarget;
    feedbackMaterial      :THREE.ShaderMaterial;
    feedbackBgMesh        :THREE.Mesh;
    pingpong:boolean = true;
    uniforms:{ [uniform: string]: THREE.IUniform } ;
    mainRenderer: THREE.WebGLRenderer;
    clearColor: number;
    clearOpacity: number;

    constructor(
        sizeX:number,
        sizeY:number,
        sharaderParams:THREE.ShaderMaterialParameters
    ){
        
        //super();
        
        this.clearColor = 0x000000;
        this.clearOpacity = 0.0;

        this.scene = new THREE.Scene();
 
        //オフスクリーンレンダリング用のカメラ
        this.camera = new OrthographicCamera();
        
        this.camera.left    =   -1;
        this.camera.right   =   1;
        this.camera.top     =   1;
        this.camera.bottom  =   -1;

        this.camera.near = 0.1;
        this.camera.far = 10;
        this.camera.position.set(0,0,1);
        this.camera.lookAt(new Vector3());

        //レンダーターゲットオブジェクト
        this.renderTarget1 = new THREE.WebGLRenderTarget(sizeX,sizeY);
        this.renderTarget2 = new THREE.WebGLRenderTarget(sizeX,sizeY);
        
        
        this.renderTarget1.texture.minFilter = Params.FILTER_FLIPFLOP;
        this.renderTarget1.texture.magFilter = Params.FILTER_FLIPFLOP;
        this.renderTarget2.texture.minFilter = Params.FILTER_FLIPFLOP;
        this.renderTarget2.texture.magFilter = Params.FILTER_FLIPFLOP;          
        

        //feedback用
        let planeGeometry = new THREE.PlaneGeometry(2,2,1,1);
        this.feedbackMaterial = new THREE.ShaderMaterial(sharaderParams);
        this.feedbackBgMesh = new THREE.Mesh(planeGeometry,this.feedbackMaterial);
        this.scene.add(this.feedbackBgMesh);

        //uniformを格納
        this.uniforms = sharaderParams.uniforms;
    }

    getTex():Texture{
        
        return this.pingpong?this.renderTarget2.texture:this.renderTarget1.texture;

    }

    clearTargets(){

        //console.log("a "+this.clearColor.toString(16));
        //console.log("b "+Params.bgColorHex.toString(16));

        this.mainRenderer.setClearColor(Params.bgColorHex,this.clearOpacity);
        //this.mainRenderer.setClearColor(Params.bgColorHex,this.clearOpacity);//this.clearOpacity);

        this.mainRenderer.setRenderTarget(this.renderTarget1);
        this.mainRenderer.clear();
        this.mainRenderer.setRenderTarget(this.renderTarget2);
        this.mainRenderer.clear();
        this.mainRenderer.setRenderTarget(null);

    }

    render(renderer:WebGLRenderer){
        
        this.mainRenderer = renderer;
        let tex = this.pingpong?this.renderTarget1:this.renderTarget2;
        renderer.setRenderTarget(tex);
        renderer.setClearColor(this.clearColor,this.clearOpacity);
        renderer.render(this.scene,this.camera);
        renderer.setRenderTarget(null);
        this.pingpong = !this.pingpong;

    }

    public resize(camera:OrthographicCamera){

        //renderTarget
        this.renderTarget1.setSize(Params.stageWidth,Params.stageHeight);
        this.renderTarget2.setSize(Params.stageWidth,Params.stageHeight);
        
        this.camera.left    =camera.left;
        this.camera.right   =camera.right;
        this.camera.top     =camera.top;
        this.camera.bottom  =camera.bottom;
        
        //pos
        //this.camera.position.copy(camera.position);
        //this.camera.rotation.copy(camera.rotation);

        //this.camera.updateProjectionMatrix();

    }

}