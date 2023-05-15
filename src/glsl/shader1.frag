  #pragma glslify: random = require(glsl-random)

  uniform sampler2D tex;
  varying vec2 vUv;

  void main() {
    
    gl_FragColor = vec4(
      random(vUv),
      0.0,
      1.0,
      1.0
    );

  }