  #pragma glslify: random = require(glsl-random)

  uniform sampler2D tex;
  varying vec2 vUv;
  varying vec4 vPos;
  varying vec4 vPos2;
  
  uniform float lineY;
  uniform float time;
  uniform vec4 textCol;

  void main() {

    vec4 color = textCol;
    color.a=1.0;
    color.xyz += 0.005*cos(time*99.9);
    
    if(vPos2.y > lineY) {
      //color = vec4(0.4,0.4,0.2,1.0);
      color.a=0.2;
      //color = vec4(0.0,0.0,0.0,0.1);
      //discard;
    }

    //if(random(vUv) < 0.5) {
    //  discard;
    //}
    
    gl_FragColor = color;

  
  }