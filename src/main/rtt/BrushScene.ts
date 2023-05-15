
import { OrthographicCamera, Scene, WebGLRenderTarget, WebGLRenderer } from "three";
import { Brushes } from "../particles/brush/Brushes";
import { Params } from "../../proof/data/Params";
import { DataManager } from "../data/DataManager";

export class BrushScene {

    renderTarget    :WebGLRenderTarget;
    brush           :Brushes;
    scene           :Scene;
    camera          :OrthographicCamera;
    sizeRatio       :number = 1;
    isClear         :boolean = true;
    mainRenderer: WebGLRenderer;

    constructor(){
        
        this.renderTarget = new WebGLRenderTarget( 
            window.innerWidth * this.sizeRatio,
            window.innerHeight * this.sizeRatio
        );

        this.renderTarget.texture.magFilter = Params.FILTER_DRAW;
        this.renderTarget.texture.minFilter = Params.FILTER_DRAW;
        


        
        this.brush = Brushes.getInstance();
        this.scene = new Scene();
        this.camera = new OrthographicCamera();
        this.scene.add(this.brush);


        let g = Params.gui.addFolder("BrushScene");
            g.close();
            g.add(this,"isClear");
            g.add(DataManager.getInstance().svg,"visible");
            this.scene.add(
                DataManager.getInstance().svg
            );

    }


    reset(){
        this.mainRenderer.setClearColor(0x000000,0.0);
        this.mainRenderer.setRenderTarget(this.renderTarget);
        this.mainRenderer.clear();
        this.mainRenderer.setRenderTarget(null);
    }


    update(renderer:WebGLRenderer){
        
        this.mainRenderer = renderer;
        this.brush.update();

        renderer.setRenderTarget(this.renderTarget);
        renderer.autoClear = this.isClear;
        //renderer.setClearColor(Params.bgColorHex,0.0);
        renderer.setClearColor(0x000000,0.0);//変わらない
        
        renderer.render(this.scene,this.camera);
        renderer.autoClear = true;
        renderer.setRenderTarget(null);

    }



    

    resize(camera:OrthographicCamera){

        //renderTarget
        this.renderTarget.width   = window.innerWidth*this.sizeRatio;
        this.renderTarget.height  = window.innerHeight*this.sizeRatio;
        
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