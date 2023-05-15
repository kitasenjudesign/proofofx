varying vec2 vUv;
varying vec4 vPos;
varying vec4 vPos2;
uniform float lineY;


void main() {
    vUv = uv;
    vPos2 =  modelViewMatrix * vec4(position, 1.0);
    vPos = projectionMatrix * vPos2;//modelViewMatrix * vec4(position, 1.0);
    gl_Position = vPos;
}
