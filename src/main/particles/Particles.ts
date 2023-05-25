import * as THREE from 'three';
import { Particle } from './Particle';
import { Forces } from './Forces';
import { PLifeCalc } from './PLifeCalc';
import { IntersectionLine } from '../intersection/IntersectionLine';
import { DataManager } from '../data/DataManager';
import { ParticleControl } from './ParticlesControl';
import myVert from "./points/point.vert";
import myFrag from "./points/point.frag";
import glslify from 'glslify';
import { Params } from '../../proof/data/Params';
import { Colors } from '../../proof/data/Colors';

export class Particles extends THREE.Object3D{

    public particles :Particle[];
    line             :IntersectionLine;
    points           :THREE.Points;
    calc             :PLifeCalc;
    //count            :number = 0;
    control          :ParticleControl;
    mat             :THREE.ShaderMaterial;
    material        :THREE.PointsMaterial;
    //lines           :Lines;

    constructor(){
        
        super();

    }

    init(){

        Forces.init();

        this.line = new IntersectionLine();
        this.line.Init( DataManager.getInstance().svg )
        this.add(this.line);
        DataManager.getInstance().instersection = this.line;

        this.particles = [];

        for(let i = 0; i < Forces.NUM; i++){
            let p = new Particle(i);
            this.particles.push(p);
        }

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for ( let i = 0; i < Forces.NUM; i ++ ) {
            vertices.push( 0, 0, 0 );
        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        let loader = new THREE.TextureLoader();
        let tex = loader.load( Params.PATH + '128x128.png');
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;

        this.material = new THREE.PointsMaterial( {
            size: 7,
            sizeAttenuation: false,
            color: 0xffffff,//Colors.rgb2hex(Colors.colors[0]),
            alphaTest: 0.5,
            map: tex
        } );

        /*
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                pointSize: { value: 5 },
                cameraConstant: { value: window.innerHeight }, // 75.0はカメラのfov、window.innerHeightは画面の高さ            
            },
            vertexShader: glslify(myVert),
            fragmentShader: glslify(myFrag),
            side: THREE.DoubleSide
          })*/

        this.points = new THREE.Points( geometry, this.material );
        this.points.frustumCulled=false;
        this.add( this.points );

        this.control = new ParticleControl();
        this.control.init(this);

        Params.gui.add(this.points,"visible").name("points.visible")

    }

    pause(){
       this.control.pause(); 
    }

    reset(){
        console.log("reset");
        this.control.reset();
        for(let i = 0; i < this.particles.length; i++){
            let p = this.particles[i];
            p.reset();
        }
        
    }

    update(){
        
        this.control.update();
        this.material.color.setRGB(
            1,1,1
            //Colors.colors[0].r,
            //Colors.colors[0].g,
            //Colors.colors[0].b
        )

        //POINTSの更新
        let list = this.points.geometry.attributes.position.array as number[];
        for(let i=0;i<list.length;i+=3){
            let pp = this.particles[i/3];
            let pos = this.particles[i/3].position;
            if(pp.visible){
                list[i+0] = pos.x;
                list[i+1] = pos.y;
                list[i+2] = pos.z;    
            }else{
                list[i+0] = 9999;
                list[i+1] = 0;
                list[i+2] = 0;
            }
        }
        this.points.geometry.attributes.position.needsUpdate = true;
        //this.calc.calc(this.particles);
    }
    
    resize(){
        //this.mat.uniforms.cameraConstant.value = window.innerHeight;
    }

}