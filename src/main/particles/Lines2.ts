
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { Lines2old } from './Lines2old';
import { SRandom } from '../data/SRandom';

export class Lines2 extends THREE.Object3D{

    numParticles:number=1000;
    strokes:LineSegments2;
    counter:number=0;
    countMax:number=0;

    positions   :number[];
    scales      :number[];
    geo         :LineSegmentsGeometry;
    private mode        :string;
    material    :LineMaterial;
    private isDirty:boolean=false;
    public static Instance:Lines2;


    constructor(){

        super();

        //let hoge = new Lines2old();
        //this.add(hoge);


        Lines2.Instance = this;

        //this.mode = Params.CONNECT_LINE;
        const positions     = new Float32Array( this.numParticles * 3 );
        const scales        = new Float32Array( this.numParticles );

        for ( let i = 0; i < this.numParticles; i++ ) {
            positions[ i*3 + 0 ] = (SRandom.random()-0.5)*20
            positions[ i*3 + 1 ] = (SRandom.random()-0.5)*20
            positions[ i*3 + 2 ] = (SRandom.random()-0.5)*20
            scales[ i ] = 1;
        }

        this.geo = new LineSegmentsGeometry();
        this.geo.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        //this.geo.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        this.material = new LineMaterial({
            color:0xff00ff,
            linewidth: 0.1, // in world units with size attenuation, pixels otherwise
            vertexColors: false,
            //resolution:  // to be set by renderer, eventually
            dashed: false,
            alphaToCoverage: true
        });
        this.strokes = new LineSegments2( this.geo, this.material );
        //this.strokes.computeLineDistances();        
        this.positions = this.geo.attributes.position.array as number[];
        this.add(this.strokes)
        
    }


    connectDots(
        x1:number,y1:number,z1:number,
        x2:number,y2:number,z2:number
    ){
        this.isDirty=true;
        //this.strokes.visible=true;

        this.positions[this.counter*3+0] = x1;
        this.positions[this.counter*3+1] = y1;
        this.positions[this.counter*3+2] = z1;
        this.counter += 1;
        this.counter = this.counter%this.numParticles;

        this.positions[this.counter*3+0] = x2;
        this.positions[this.counter*3+1] = y2;
        this.positions[this.counter*3+2] = z2;
        this.counter += 1;
        this.counter = this.counter%this.numParticles;
        
        //this.countMax=Math.max(this.countMax,this.counter)
        
    }

    resetCount(){
        this.counter=0;
    }

    //pointsに従ってレンダリングします
    update(){
        
        if(this.strokes.visible && this.isDirty){
            //this.strokes.computeLineDistances();
            this.geo.attributes.position.needsUpdate = true;
            this.isDirty=false;
        }
        //this.geo.attributes.scale.needsUpdate = true;
        //this.resetCount();

    }

}