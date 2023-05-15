#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require("./random.glsl")
#pragma glslify: gradient = require("./gradient.glsl")



    uniform vec2 size;
    uniform float time;
    uniform float colorId;
    uniform sampler2D tex;
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    varying vec3 vNormal;
    varying vec2 vUv;
  


    void main(void)
    {
      vec4 colBlur = texture2D(//ボケ用の数値
        tex2,
        vUv.xy
      );

      //勾配を取得する
      vec2 gradientValue = gradient(tex2,vUv.xy,size,1.0);
      
      //勾配に応じて変位させる
      vec2 offset = vec2(
        gradientValue.x*0.1,
        gradientValue.y*0.1
      );

      //変位させる
      vec4 col=texture2D(
        tex,//一個前の。
        vUv.xy+offset
      );

      //元の色,pigment
      vec4 colPigment=texture2D(
        tex1,
        vUv.xy
      );
      
      //背景とブレンド
      col += colPigment * colBlur.a;
      col.a += colBlur.a;

      //col.a = colBlur.a;
      
      gl_FragColor=vec4(col.rgba);
      //gl_FragColor = vec4(gradientValue.xy*10.0,0.0,1.0);


    }

