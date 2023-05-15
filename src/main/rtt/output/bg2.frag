#pragma glslify: random = require(glsl-random)
#pragma glslify: gradient = require("./gradient3.glsl")
#pragma glslify: unsharp = require("./unsharp.glsl")

//#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

  uniform sampler2D tex;
  uniform sampler2D tex2;

  uniform vec2 size;
  uniform vec4 bgCol;
  uniform float alpha;

  varying vec2 vUv;

  void main() {

    //vec2 offset = texture2D()

    vec2 uvv = vUv.xy;

    vec2 offset = vec2(
      random( vUv.xy + vec2(0.0,110.0) ) * 0.001,
      random( vUv.xy + vec2(0.0,99.0) ) * 0.001
    );
    
    
    vec4 col1 = unsharp(tex,uvv,size,1.0);
    
    /*
    vec4 col1 = texture2D(tex,uvv);
    vec2 gradientValue = gradient(tex,uvv,size,1.0);
    col1.x += gradientValue.x;
    col1.y += gradientValue.x;
    col1.z += gradientValue.x;
    */

    //vec4 col2 = texture2D(tex,vUv);
    //vec4 col2 = texture2D(tex,vUv.xy + vec2(0.0, 5.0/size.y));//sizey
    //vec4 col3 = texture2D(tex,vUv.xy + vec2(0.0, -5.0/size.y));

    vec4 bgColor = bgCol;
    vec4 outputCol  = mix(
      bgColor,
      col1,
      col1.a*alpha
    );



    gl_FragColor = vec4(outputCol.rgb,1.0);
  
  }