#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

  uniform sampler2D tex;
  uniform sampler2D tex2;

  uniform vec2 size;
  varying vec2 vUv;


  void main() {

    vec4 col1 = texture2D(tex,vUv);

    vec4 bgColor    = vec4(0.6,0.6,0.5,1.0);
    vec4 outputCol  = mix(
      bgColor,
      col1,
      col1.a
    );

    gl_FragColor = vec4(outputCol.rgb,1.0);
  
  }