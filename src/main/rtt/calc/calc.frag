#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require("./random.glsl")
#pragma glslify: gradient = require("./gradient.glsl")



    uniform vec2 size;
    uniform float time;
    uniform float colorId;
    //uniform float speed;
    uniform sampler2D tex;
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    uniform float maxAlpha;
    uniform float alphaSpeed;
    uniform float alphaSpeed2;
    uniform float gensui;

    varying vec3 vNormal;
    varying vec2 vUv;
  


    void main(void)
    {

      vec4 colBlur = texture2D(//ボケ用の数値
        tex2,
        vUv.xy
      );
      vec4 col=texture2D(//一個前の。
        tex,
        vUv.xy
      );
      vec4 colPigment=texture2D(//元の色,pigment用
        tex1,
        vUv.xy
      );
      
      //背景とブレンド
      //暗い色を無視する
      //float ratio = smoothstep(0.2,0.25,length(colPigment.rgb));
      col.rgb = mix(
        col.rgb,        //一個前と変わらない色
        colPigment.rgb, //繰り返すとおよそ　この色になる
        clamp(colBlur.a*alphaSpeed2,0.0,1.0)//この値は乾いて０に近づいていく
      );

      //定着の割合、
      vec2 nPos = (vUv.xy*30.0);
      float paper=snoise3(vec3(nPos,time*0.0));
      //col.a += colBlur.a*(0.01+(0.005*paper))*alphaSpeed;

      //ブラーのアルファ分ふやす＝水が乾くまで
      col.a += pow(colBlur.a,2.0)*(0.01)*alphaSpeed;

      float maxAlpha1 = maxAlpha + 0.1*paper;
      col.a = clamp(col.a,0.0,maxAlpha1);

      //col.a = colBlur.a;
      col.a*=gensui;//*length(colPigment.rgb);

      gl_FragColor=vec4(col.rgba);
      //gl_FragColor = vec4(gradientValue.xy*10.0,0.0,1.0);


    }

