import * as THREE from 'three';
import { Particle } from './Particle';
import { IntersectionLine } from '../intersection/IntersectionLine';

export class ParticlesBase extends THREE.Object3D{

    public particles :Particle[];    

    public line :IntersectionLine;
    init(){

    }

    update(){

    }

    pause(){

    }

    reset(){

    }

    resize(){
        //this.mat.uniforms.cameraConstant.value = window.innerHeight;
    }

    
}