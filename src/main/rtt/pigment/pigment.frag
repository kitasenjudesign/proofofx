#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require("./random.glsl")
#pragma glslify: gradient = require("./gradient2.glsl")
#pragma glslify: yiq = require("./yiq.glsl")


    uniform vec2 size;
    uniform float time;
    uniform float colorId;
    uniform sampler2D tex;//past
    uniform sampler2D tex1;//input
    uniform sampler2D tex2;//blur
    uniform vec2 displacement;
    varying vec3 vNormal;
    varying vec2 vUv;
  

    void main(void)
    {
      //ボケ用の数値
      vec4 colBlur = texture2D(
        tex2,
        vUv.xy
      );

      //勾配を取得する
      vec2 gradientValue = gradient(tex2,vUv.xy,size,1.0);

      //ボケの透明度によって強度を変える、あまり変化なし
      //if(vUv.x<0.5){
      //  gradientValue.x *= colBlur.a;
      //  gradientValue.y *= colBlur.a;
      //}

      float nx = 1.0;
      float ny = 1.0;

      //勾配に応じて変位させる
      vec2 offset = vec2(
        gradientValue.x * displacement.x * nx,//gradientValue(-1,1)
        gradientValue.y * displacement.y * ny
      );

      //一個前のを変位させる
      vec4 col = texture2D(
        tex,//一個前の。
        vUv.xy+offset
      );

      //変位なしの色
      vec4 col0 = texture2D(
        tex,//一個前の。
        vUv.xy
      );

      col=mix(
        col0,
        col,
        col.a//変位したところの透明度
      );

      //色を変えたかったら
      //float kosa=0.1;//*(random(floor(vUv.xy*50.0))-0.5);
      //col.xyz = yiq(col.xyz,kosa);//yiq


      vec4 inputCol=texture2D(
        tex1,//ブラシinput
        vUv.xy+offset//変位あり
      );
      vec4 inputCol0=texture2D(
        tex1,//ブラシinput
        vUv//変位なし
      );

      //元の色,pigment
      col.rgb = mix(
        col.rgb,      //１個前の色（変位あり）
        //inputCol.rgb, //ブラシsceneのinputの色(変位あり)
        //inputCol.a    //ブラシsceneのinputのアルファ(変位あり)
        inputCol0.rgb, //ブラシsceneのinputの色(変位なし)
        inputCol0.a    //ブラシsceneのinputのアルファ(変位なし)

      );
      
      //背景とブレンド
      //col += colPigment * colBlur.a * 0.1;
      //col.a += colBlur.a*0.01;

      //col.a = colBlur.a;
      //色が黒いのを調べる！！！！

      gl_FragColor=vec4(col.rgb,1.0);
      //gl_FragColor = vec4(gradientValue.xy*10.0,0.0,1.0);

    }

