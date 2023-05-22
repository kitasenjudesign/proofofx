#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vColor;
varying vec4 vPosition;
varying vec3 localPos;
varying float vRandom;
varying float vOpacity;

varying vec2 vUv;
varying float vLife;
uniform sampler2D tex;
uniform float detail;
uniform float border;
uniform float highlight;
uniform float opacity;

void main() {

    vec3 col = vColor;
    //col.x += snoise3(vPosition.xyz*0.05);
    //col.y += snoise3(vPosition.xyz*0.05);
    //col.z += snoise3(vPosition.xyz*0.05);
    //ブラシをもっとブラシいぽくする

    vec3 offset     = vec3(vRandom,0.0,0.0);
    vec4 texColor   = texture2D(tex, vUv);
    float b         = snoise3(vec3(vUv.x*detail,vPosition.xy*0.01));

    if(b<(vLife-0.5)*2.0) discard;

    //0.6,0.6,0.5

    //vec3 added = b*vec3(0.6,0.6,0.3)*highlight;
    vec3 added = b*vec3(0.3,0.3,0.3)*highlight;

    //gl_FragColor = vec4(col.rgb, 0.5+0.5*snoise3(offset+vPosition.xyz*0.05)); // varying変数から頂点カラーを取得して出力

    float fuchi = (1.0-border) + border * texColor.x;
    gl_FragColor = vec4(col.rgb*fuchi+added,vOpacity); // varying変数から頂点カラーを取得して出力

}