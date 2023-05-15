#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vColor;
varying vec4 vPosition;
varying vec3 localPos;
varying float vRandom;
varying vec2 vUv;
uniform sampler2D tex;
uniform float detail;

void main() {

vec3 col = vColor;

col.x = 0.5 + 0.5 * sin(vUv.x*3.1415);
col.y = 0.5 + 0.5 * sin(vUv.x*3.1415);
col.z = 0.5 + 0.5 * sin(vUv.x*3.1415);


//gl_FragColor = vec4(col.rgb, 0.5+0.5*snoise3(offset+vPosition.xyz*0.05)); // varying変数から頂点カラーを取得して出力
gl_FragColor = vec4(col.rgb,1.0); // varying変数から頂点カラーを取得して出力

}