#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
//#pragma glslify: gaussian = require("./gaussian.glsl")

    uniform vec2 size;
    uniform float time;
    uniform float colorId;
    uniform float attenuation;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main(void)
    {
      vec2 offset = vec2(
        snoise3(vec3(vUv.xy*35.1,1.2*time+0.001))*0.0002,
        snoise3(vec3(vUv.xy*35.1,1.2*time+999.9))*0.0002
        //0.0*(random(vUv.xy+vec2(0.01*time,111.0))-0.5),
        //0.0*(random(vUv.xy+vec2(0.01*time,197.9))-0.5)        
      );
      //vec4 col2 = texture2D(
      //  tex2,
      //  vUv.xy+offset
      //);

      vec2 pixel = vec2(1.0/size.x,1.0/size.y);

/*
      vec4 col1 = 1.0*texture2D(tex,vUv.xy+vec2(-1.0,-1.0)*pixel+offset);
      vec4 col2 = 2.0*texture2D(tex,vUv.xy+vec2(0.0,-1.0) *pixel+offset);
      vec4 col3 = 1.0*texture2D(tex,vUv.xy+vec2(1.0,-1.0) *pixel+offset);
      
      vec4 col4 = 2.0*texture2D(tex,vUv.xy+vec2(-1.0,0.0) *pixel+offset);
      vec4 col5 = 4.0*texture2D(tex,vUv.xy+vec2(0.0,0.0)  *pixel+offset);
      vec4 col6 = 2.0*texture2D(tex,vUv.xy+vec2(1.0,0.0)  *pixel+offset);

      vec4 col7 = 1.0*texture2D(tex,vUv.xy+vec2(-1.0,1.0) *pixel+offset);
      vec4 col8 = 2.0*texture2D(tex,vUv.xy+vec2(0.0,1.0)  *pixel+offset);
      vec4 col9 = 1.0*texture2D(tex,vUv.xy+vec2(1.0,1.0)  *pixel+offset);

      vec4 col = col1+col2+col3+col4+col5+col6+col7+col8+col9;      
      col/=(16.0);
      col*=attenuation;*/

      vec4 col = texture2D(tex,vUv);
      vec4 inputTex = texture2D(tex2,vUv);
      col.rgb = mix(
        col.rgb,
        inputTex.rgb,
        inputTex.a
      );
      col.a = max(inputTex.a,col.a);
      //col*=attenuation;
      col -= 0.1;
      //col*=0.999;
      //col*=0.99;
      //col*=0.99;

      //col-=0.0005;
        //col1.x-=0.005;
        //col1.y-=0.005;
        //col1.z-=0.005;
        //col1.rgb *= col1.rgb*0.999;
        //col.g=1.0;
        //col1.rgb*=0.99+0.01*snoise3(vec3(vUv.xy*15.1,time*0.01));

      gl_FragColor=vec4(col.rgba);

    }