#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 


    uniform vec2 size;
    uniform float time;
    uniform float colorId;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    varying vec3 vNormal;
    varying vec2 vUv;
  
    float random (vec2 st) {
      return fract(sin(dot(st.xy,
                           vec2(12.9898,78.233)))*
          43758.5453123);
    }



    void main(void)
    {
      vec2 offset = vec2(
        //snoise3(vec3(vUv.xy*35.1,0.1*time+0.001))*0.002,
        //snoise3(vec3(vUv.xy*35.1,0.1*time+999.9))*0.002
        0.001*(random(vUv.xy+vec2(0.01*time,111.0))-0.5),
        0.001*(random(vUv.xy+vec2(0.01*time,197.9))-0.5)        
      );
      vec4 col2 = texture2D(
        tex2,
        vUv.xy+offset
      );

      //float rad = 0.0;//atan(col2.g-0.5,col2.r-0.5); 
      //offset.x = 0.01*(col2.r-0.5);//0.001*cos(rad);
      //offset.y = 0.01*(col2.g-0.5);//0.001*sin(rad);

      vec4 col1 = texture2D(tex,vUv.xy+offset);
        
        //col1.x-=0.005;
        //col1.y-=0.005;
        //col1.z-=0.005;
        //col1.rgb *= col1.rgb*0.999;
        //col.g=1.0;
        //col1.rgb*=0.99+0.01*snoise3(vec3(vUv.xy*15.1,time*0.01));

      gl_FragColor=vec4(col1.rgba);

    }