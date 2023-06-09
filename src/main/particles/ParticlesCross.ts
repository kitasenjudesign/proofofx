import * as THREE from 'three';
import { Particle } from './Particle';
import { Forces } from './Forces';
import { PLifeCalc } from './PLifeCalc';
import { IntersectionLine } from '../intersection/IntersectionLine';
import { DataManager } from '../data/DataManager';
import { ParticleControl } from './ParticlesControl';
import { Params } from '../../proof/data/Params';
import { ParticlesBase } from './ParticlesBase';

export class ParticlesCross extends ParticlesBase{

    public particles :Particle[];
    line             :IntersectionLine;
    points           :THREE.InstancedMesh;
    calc             :PLifeCalc;
    control          :ParticleControl;
    mat             :THREE.MeshBasicMaterial;
    material        :THREE.MeshBasicMaterial;

    constructor(){
        
        super();

    }

    override init(){

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

        this.material = new THREE.MeshBasicMaterial( {
            color: 0xffffff//Colors.rgb2hex(Colors.colors[0]),
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

        //this.points = new THREE.InstancedMesh( geometry, this.material );
        this.points.frustumCulled=false;
        this.add( this.points );

        this.control = new ParticleControl();
        this.control.init(this);

        Params.gui.add(this.points,"visible").name("points.visible")

    }

    override pause(){
       this.control.pause(); 
    }

    override reset(){
        console.log("reset");
        this.control.reset();
        for(let i = 0; i < this.particles.length; i++){
            let p = this.particles[i];
            p.reset();
        }
        
    }

    override update(){
        
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
    
    

}