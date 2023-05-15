    varying vec2 vUv;
    varying vec3 vNormal;
    uniform mat4 projMat;
    
    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      
      //vNormal = normalMatrix * normal;//視点座標系に
      vNormal = normal;//視点座標系に

      gl_Position = projectionMatrix*mvPosition;
      //projectionMatrix * mvPosition;
    }