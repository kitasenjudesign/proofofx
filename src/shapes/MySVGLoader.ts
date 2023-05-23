import * as THREE from 'three';
import { MeshBasicMaterial, BoxGeometry, Object3D, Shape, Vector3 } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Params } from '../proof/data/Params';
import { MySVGLogo } from './MySVGLogo';
import { MySVGLogo2 } from './MySVGLogo2';


export class MySVGLoader extends Object3D{

    loader  :SVGLoader;
    shapes   :Shape[][]
    callback :()=>void;
    points      :THREE.Vector3[] = [];
    pointsForLine  :THREE.Vector3[][] = [];
    count    :number = 0;
    //svgScale :number = 2;
    //material   :MeshBasicMaterial;
    public logo     : MySVGLogo;
    public logo2    : MySVGLogo2;

    constructor(){
        super();
    }

    init(url:string,callback:()=>void){

        this.callback = callback;
        this.shapes = [];
        this.loader = new SVGLoader();
        this.loader.load( url, ( data )=>{

            console.log("onload")
            const paths = data.paths;
            for ( let i = 0; i < paths.length; i ++ ) { 
                const path = paths[ i ];
                const shapes = SVGLoader.createShapes( path );
                this.shapes.push(shapes);
            }

            this.makeAllPoints(false); 

            this.logo = new MySVGLogo();
            this.logo.init(this.shapes);
            this.add(this.logo);

            this.logo2 = new MySVGLogo2();
            this.logo2.init(this.logo.fillMesh);

            
            this.callback();
        });

    }


    getRandomPoint():THREE.Vector3{

        return this.getNextPoint();
        
    }

    getNextPoint():THREE.Vector3{

        return this.points[this.count++%this.points.length];

    }

    makeAllPoints(isDummy:boolean){

        this.points = [];
        this.pointsForLine = [];
        let geo = new BoxGeometry(4,4,4);
        let mat = new MeshBasicMaterial({color:0xff0000})

        for(let i=0;i<this.shapes.length;i++){

            let shape = this.shapes[i];
            for(let j=0;j<shape.length;j++){

                let pts = shape[j].getSpacedPoints(50);
                let pts2 = [];
                for(let k=0;k<pts.length;k++){
                    this.points.push(new Vector3(
                        pts[k].x,
                        -pts[k].y,
                        0
                    ));
                    pts2.push(new Vector3(
                        pts[k].x,
                        -pts[k].y,
                        0
                    ));
                }
                this.pointsForLine.push(pts2);

                
                let holes = shape[j].holes;
                console.log(
                    ">> " + holes.length
                )
                for(let k=0;k<holes.length;k++){
                    let pts = holes[k].getSpacedPoints(50);
                    pts2 = [];
                    for(let l=0;l<pts.length;l++){
                        this.points.push(new Vector3(
                            pts[l].x,
                            -pts[l].y,
                            0
                        ));
                        pts2.push(new Vector3(
                            pts[l].x,
                            -pts[l].y,
                            0
                        ));                        
                    }
                    this.pointsForLine.push(pts2);

                }
        
            }
            
        }
        


    }


    update(){
    }

}