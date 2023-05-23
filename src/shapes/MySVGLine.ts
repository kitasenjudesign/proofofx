import * as THREE from 'three';
import vert from "./line/line.vert";
import frag from "./line/line.frag";
import glslify from 'glslify';
import { SRandom } from '../main/data/SRandom';
import { Colors } from '../proof/data/Colors';
import { Params } from '../proof/data/Params';
import { DataManager } from '../main/data/DataManager';

export class MySVGLine extends THREE.Object3D{

    //ストロークを書く
    numParticles:number=5000;
    strokes:THREE.Line;
    counter=0;

    positions   :number[];
    colors      :number[];
    scales      :number[];
    geo         :THREE.BufferGeometry;
    private mode        :string;
    //material    :THREE.LineBasicMaterial;
    material       :THREE.ShaderMaterial;
    isDirty     :boolean=false;

    init(){

        //this.mode = Params.CONNECT_LINE;
        const positions = new Float32Array( this.numParticles * 3 );
        const colors = new Float32Array( this.numParticles*3 );
        
        for ( let i = 0; i < this.numParticles; i++ ) {
            positions[ i*3 + 0 ] = 9999;
            positions[ i*3 + 1 ] = 9999;
            positions[ i*3 + 2 ] = 9999;
            colors[ i*3 + 0 ] = SRandom.random();
            colors[ i*3 + 1 ] = SRandom.random();
            colors[ i*3 + 2 ] = SRandom.random();
        }

        this.geo = new THREE.BufferGeometry();
        this.geo.setAttribute('color1', new THREE.BufferAttribute(colors, 3, true));
        this.geo.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        //this.geo.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        /*
        this.material = new THREE.LineBasicMaterial({
            color:0xffffff
        });*/
        
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                opacity: {value: 1.0},
                time:{value:0.0},
                lineY:{value:0.0}
            },
            transparent: true,
            vertexColors: true,
            vertexShader: glslify(vert),
            fragmentShader: glslify(frag),
            //opacity: 0.5         
        });
        
        //this.material.opacity=0.5;
        this.strokes = new THREE.LineSegments( this.geo, this.material );
        //scene.add( particles );
        this.positions  = this.geo.attributes.position.array as number[];
        this.colors     = this.geo.attributes.color1.array as number[]; 
        //this.scales = this.particles.geometry.attributes.scale.array as number[];

        this.add(this.strokes);
        this.hide();
       
        Params.gui.add(this.material.uniforms.lineY,"value",-2000,2000).name("lineY").listen();

    }

    show(){
        this.strokes.visible=true;
    }
    hide(){
        this.strokes.visible=false;
    }

    updateLines(){
        
        console.log("updateLines");
        this.reset();

        let points = DataManager.getInstance().svg.pointsForLine

        for(let i=0;i<points.length;i++){
            let pts = points[i];            
            for(let j=0;j<pts.length-1;j++){
                
                let col = Colors.getRandomColor();
                let p1 = pts[j];
                let p2 = pts[j+1];

                this.connectDots(
                    p1.x,p1.y,p1.z,
                    p2.x,p2.y,p2.z,
                    col.r,col.g,col.b
                );
            }
        }    
        
    }


    reset(){
        this.counter=0;
        //this.strokes.visible=false;
        for ( let i = 0; i < this.positions.length; i++ ) {
            this.positions[i]=0;
        }
        this.geo.attributes.position.needsUpdate = true;
    }

    resetCount(){
        this.counter=0;
        
    }


    connectDots(
        x1:number,y1:number,z1:number,//start
        x2:number,y2:number,z2:number,//goal
        rr:number,gg:number,bb:number,//color
    ){
    
        this.isDirty=true;
        this.strokes.visible=true;
        let ratio = 0;//-Math.pow(brightness,3);
        
        let sx:number = 1;//1/Params.SVG_SCALE;
        let sy:number = -1;//-1/Params.SVG_SCALE;
        let sz:number = 1;//1/Params.SVG_SCALE;

        //x2はゴール
        this.positions[this.counter*6+0] = x1*sx;//x2*ratio+x1*(1-ratio);
        this.positions[this.counter*6+1] = y1*sy;//y2*ratio+y1*(1-ratio);
        this.positions[this.counter*6+2] = z1*sz;//z1;//z2*ratio+z1*(1-ratio);

        this.positions[this.counter*6+3] = x2*sx;
        this.positions[this.counter*6+4] = y2*sy;
        this.positions[this.counter*6+5] = z2*sz;//z2;
        
        this.colors[this.counter*6+0] = rr;
        this.colors[this.counter*6+1] = gg;
        this.colors[this.counter*6+2] = bb;

        this.colors[this.counter*6+3] = rr;
        this.colors[this.counter*6+4] = gg;
        this.colors[this.counter*6+5] = bb;

        if(this.counter<this.numParticles){
            this.counter += 1;
        }else{
            console.log("stroke数を超えた")
        }
                
    }


    public setY(yy:number){

        //this.material.
        if(this.material){
            this.material.uniforms.lineY.value = yy;
            this.material.uniforms.time.value += 0.01;    
        }

    }

    //pointsに従ってレンダリングします
    update(){
    
        /*
        this.material.color.setRGB(
            Colors.colors[0].r,
            Colors.colors[0].g,
            Colors.colors[0].b
        );*/

        //if(this.strokes.visible && this.isDirty){
        if(this.isDirty){
            console.log("update!!!");
            this.geo.attributes.position.needsUpdate = true;
            this.geo.attributes.color1.needsUpdate = true;
            this.isDirty=false;
        }
        //}
        //this.resetCount();

    }


}