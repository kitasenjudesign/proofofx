
import * as THREE from 'three';

export class Lines extends THREE.Object3D{

    numParticles:number=30000;
    strokes:THREE.Line;
    counter:number=0;
    countMax:number=0;

    positions   :number[];
    scales      :number[];
    geo         :THREE.BufferGeometry;
    private mode        :string;
    material    :THREE.LineBasicMaterial;
    private isDirty:boolean=false;
    public static Instance:Lines;


    constructor(){

        super();

        Lines.Instance = this;

        //this.mode = Params.CONNECT_LINE;
        const positions     = new Float32Array( this.numParticles * 3 );
        const scales        = new Float32Array( this.numParticles );

        for ( let i = 0; i < this.numParticles; i++ ) {
            positions[ i*3 + 0 ] = 0;
            positions[ i*3 + 1 ] = 0;
            positions[ i*3 + 2 ] = 0;
            scales[ i ] = 1;
        }

        this.geo = new THREE.BufferGeometry();
        this.geo.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        //this.geo.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        this.material = new THREE.LineBasicMaterial({
            color:0x000000
        
        });
        this.strokes = new THREE.LineSegments( this.geo, this.material );
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
            this.geo.attributes.position.needsUpdate = true;
            this.isDirty=false;
        }
        //this.geo.attributes.scale.needsUpdate = true;
        //this.resetCount();

    }

}