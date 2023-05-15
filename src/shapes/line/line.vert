  varying vec3 vColor;
  attribute vec3 color1;
  varying vec2 vUv;
  varying vec4 vPos;
  varying vec4 vPos2;
  uniform float lineY;

  void main() {

    vUv=uv;
    vColor = color1; // 頂点カラーを受け取り、varying変数に格納
    vPos2 = modelViewMatrix * vec4(position, 1.0);
    vPos = projectionMatrix * vPos2; // 頂点座標を受け取り、varying変数に格納
    gl_Position = vPos;

  }