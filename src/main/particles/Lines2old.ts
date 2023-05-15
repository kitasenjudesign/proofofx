
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Object3D } from 'three';
import { SRandom } from '../data/SRandom';


export class Lines2old extends Object3D{

    line2seg:LineSegments2;

    constructor(){

        super();

        const geometry = new THREE.BufferGeometry();

        let points = [];
        for(let i=0;i<3*2500;i+=3){
            points[i+0]=SRandom.random()*1000-500
            points[i+1]=SRandom.random()*1000-500
            points[i+2]=SRandom.random()*1000-500
        }
        const vertices = new Float32Array(points);
        const lineGeo = new LineGeometry();
        lineGeo.setPositions( vertices );


        this.line2seg = new LineSegments2( 
            lineGeo, 
            new LineMaterial( {
                color: 0x0000ff,
                linewidth: 0.001, // in world units with size attenuation, pixels otherwise
                vertexColors: false,
                //resolution:  // to be set by renderer, eventually
                dashed: false,
                alphaToCoverage: true
            } ) 
        );
        this.line2seg.computeLineDistances();

        this.add(this.line2seg)
    }

    //つなぐあれ



    show(){
        
    }

    hide(){
        
    }


}
