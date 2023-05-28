import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, Object3D, Shape, Vector2 } from "three";
import { MySVGLoader } from "../../shapes/MySVGLoader";
import { LineSeg } from "./LineSeg";
import { Params } from "../../proof/data/Params";
import { DataManager } from "../data/DataManager";
import { SRandom } from "../data/SRandom";
import { Colors } from "../../proof/data/Colors";
import { IntersectionPoint } from './IntersectionPoint';
import { gsap } from "gsap";



export class IntersectionLine extends Object3D{
    tween: gsap.core.Tween;


    shapes      :Shape[][]
    startPos    :THREE.Vector3;
    endPos      :THREE.Vector3;
    yy          :number = 0.0;
    
    linesSegs   :LineSeg[];
    lineY       :LineSeg;
    lineMesh    :Line;

    count       :number = 0;
    currentIndex       :number = 0;
    currentCrossPoints :THREE.Vector2[] = [];
    
    linePoints:IntersectionPoint[] = [];

    material :LineBasicMaterial;
    index:number=0;

    constructor(){
        
        super();

        this.yy=window.innerHeight/2;

        // 線のジオメトリを作成
        this.material = new LineBasicMaterial({ color: 0xffffff });
        const geometry = new BufferGeometry();
        const vertices = new Float32Array([
            -1000, 0, 0,
            1000, 0, 0
        ]);
        geometry.setAttribute('position', new BufferAttribute(vertices, 3));

        // 線を作成
        this.lineMesh = new Line(geometry, this.material);
        this.add(this.lineMesh);

        this.lineY = new LineSeg(
            -1000,this.yy,
            1000,this.yy
        );
        
    }

    public Init(svg:MySVGLoader){

        this.shapes=svg.shapes;
        this.linesSegs = [];
            
        for(let i=0;i<this.shapes.length;i++){

            for(let j=0;j<this.shapes[i].length;j++){
                
                let shape = this.shapes[i][j];
                console.log("length"+shape.getLength())
                //let points = shape.getPoints(shape.getLength()/10);
                let points = shape.getSpacedPoints(shape.getLength()/4);


                for(let k=0;k<points.length-1;k++){
                
                    let point1 = points[k];
                    let point2 = points[k+1];

                    this.linePoints.push(new IntersectionPoint(
                        point1.x,// * Params.SVG_SCALE,
                        point1.y// * -Params.SVG_SCALE
                    ));
                
                    let line = new LineSeg(
                        point1.x * Params.SVG_SCALE,
                        point1.y * -Params.SVG_SCALE,
                        point2.x * Params.SVG_SCALE,
                        point2.y * -Params.SVG_SCALE
                    );
                    this.linesSegs.push(line);

                }

            }

        }

    }


    public GetCurrentCrossPoints():THREE.Vector2[]{
        return this.currentCrossPoints
    }

    public GetCurrentRandomPoint():THREE.Vector2{

        if(!this.currentCrossPoints)return null;
        if(this.currentCrossPoints.length==0)return null;

        //順に出していくようにする

        //this.currentIndex++;
        return this.currentCrossPoints[
            Math.floor(SRandom.random() * this.currentCrossPoints.length)
            //this.currentIndex%this.currentCrossPoints.length
        ];

    }


    private GetCrossPoints():THREE.Vector2[]{
        
        let crossPoints:THREE.Vector2[] = [];
        for(let i=0;i<this.linePoints.length;i++){
            let pp = this.linePoints[i];
            let pos = new Vector2(
                pp.x,-pp.y
            )

            if(pos.y*Params.SVG_SCALE>this.yy && pp.enable){
                
                pp.enable=false;

                crossPoints.push(
                    new Vector2(
                        pos.x*Params.SVG_SCALE,
                        pos.y*Params.SVG_SCALE
                    )
                );

            }
        }

        return crossPoints;
    }


    reset(){
        this.yy=window.innerHeight/2;
        for(let i=0;i<this.linePoints.length;i++){
            this.linePoints[i].enable=true;
        }
    }
    
    public updateCrossPoints(){
        this.currentCrossPoints = this.GetCrossPoints();
    }

    public pause(){
        if(this.tween.paused()) this.tween.resume();
        else this.tween.pause();
    }

    public tweenY(){
        this.yy = window.innerHeight/2
        this.tween = gsap.to(this,{
            yy:-window.innerHeight/2,
            duration:12.0,
            ease:"linear",
            onComplete:()=>{
                this.onTweenY();
            }
        });
    }

    public onTweenY(){
        if(Params.MODE_WEBSITE){
            setTimeout(()=>{
                DataManager.getInstance().regenerate();
                this.tweenY();
            },1000);    
        }
    }

    //crossPointを取得する
    public updateY(){

        this.material.color.setRGB(
            Colors.colors[0].r,
            Colors.colors[0].g,
            Colors.colors[0].b
        )
        //console.log(this.linePoints.length,this.currentCrossPoints.length);

        //yをよくする
        let h = DataManager.getInstance().domControl.title.height;
        DataManager.getInstance().domControl.setTitleY(
            -this.yy+window.innerHeight/2-h
        ) 
            
        //this.yy-=1.7;
        if(this.yy<-window.innerHeight/2){
            //this.yy=window.innerHeight/2;
        }
        this.count++;

        this.lineMesh.position.y = this.yy;
        this.lineY.start.y  = this.yy-1;
        this.lineY.end.y    = this.yy+1;

        DataManager.getInstance().svg.logo.setY(this.yy);
        DataManager.getInstance().svg.logo2.setY(this.yy);

    }


}