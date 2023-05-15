//#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vColor;
varying vec4 vPosition;
varying vec2 vUv;
varying vec4 vPos;
varying vec4 vPos2;
uniform float opacity;
uniform float lineY;
  
void main() {
    vec3 col = vColor;
    //if( fract(vUv.x*100.0) < 0.5){
    //  discard;
    //}
    //if( fract(vPos.x*40.0+vPos.y*40.0) < 0.8){
    //  discard;
    //}

    if(vPos2.y < lineY) {
      //color = vec4(0.4,0.4,0.2,1.0);
      //color = vec4(1.0,0.0,0.0,0.1);
      discard;
    }

    gl_FragColor = vec4(col,opacity);
}