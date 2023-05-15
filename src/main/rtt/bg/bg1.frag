#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

  uniform sampler2D tex;
  uniform sampler2D tex2;

  uniform vec2 size;
  varying vec2 vUv;


  void main() {

    //vec2 offset = texture2D()
    //vec4 col1 = texture2D(tex,vUv);
    //vec4 col2 = texture2D(tex,vUv);
    //vec4 col2 = texture2D(tex,vUv.xy + vec2(0.0, 5.0/size.y));//sizey
    //vec4 col3 = texture2D(tex,vUv.xy + vec2(0.0, -5.0/size.y));

    vec2 texel = 1.0 / size;

    // Sobel カーネル
    float k[9];
    k[0] = -1.0; k[1] = -2.0; k[2] = -1.0;
    k[3] =  0.0; k[4] =  0.0; k[5] =  0.0;
    k[6] =  1.0; k[7] =  2.0; k[8] =  1.0;

    vec3 sample[9];
    for (int i = 0; i < 9; i++) {
      vec2 offset = texel * vec2(float((i % 3) - 1), float((i / 3) - 1));
      sample[i] = texture2D(tDiffuse, vUv + offset).rgb;
    }

    vec3 Gx = vec3(0.0);
    vec3 Gy = vec3(0.0);
    for (int i = 0; i < 9; i++) {
      Gx += k[i] * sample[i] * float((i % 3) - 1);
      Gy += k[i] * sample[i] * float((i / 3) - 1);
    }

    // エッジの強度を計算
    vec3 edge = sqrt(Gx * Gx + Gy * Gy);


    gl_FragColor = vec4(edge.rgb,1.0);
  
  }