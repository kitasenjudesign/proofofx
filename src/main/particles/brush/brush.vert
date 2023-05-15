  varying vec3 vColor;
  varying vec4 vPosition;
  varying vec3 localPos;
  varying float vRandom;
  varying float vLife;
  varying float vOpacity;
  varying vec2 vUv;
  attribute vec3 randoms; 
  attribute vec2 uvs;
  void main() {
    
    vRandom = randoms.x;
    vLife = randoms.y;
    vOpacity = randoms.z;
    
    vColor = color; // 頂点カラーを受け取り、varying変数に格納
    vec4 vert = modelViewMatrix * vec4(position, 1.0); // 頂点座標を受け取り、varying変数に格納
    //vert.xy = floor( vert.xy / 10.0 ) * 10.0;
    vPosition = vert;

    vUv = uvs;
    localPos = position;
    gl_Position = projectionMatrix * vPosition;

  }