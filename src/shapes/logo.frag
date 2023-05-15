  #pragma glslify: random = require(glsl-random)

  uniform sampler2D tex;
  varying vec2 vUv;
  varying vec4 vPos;
  uniform float lineY;
  uniform vec4 col1;
  uniform vec4 col2;
  uniform float time;
  varying vec4 vPos2;

  void main() {

    vec4 color = col1+0.02*cos(time);
    
    if(vPos2.y > lineY) {
      //color = vec4(0.4,0.4,0.2,1.0);
      color = col2;
    }

    //if( fract(vPos.x*40.0-vPos.y*40.0) < 0.9){
      //discard;
      //color.a = 0.05;
    //}
    
    //if(fract(vUv.y*20.0)<0.5){
    //  discard;
    //}
    
    gl_FragColor = color;

  
  }