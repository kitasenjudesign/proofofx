// 勾配計算関数
vec4 unsharp(sampler2D pTex, vec2 texCoord, vec2 resolution, float scale) {

  vec2 pixel = scale / resolution;
  vec2 uvv = texCoord.xy;
    
  vec4 col1 = texture2D(pTex,uvv.xy+vec2(-1.0,-1.0)*pixel);
  vec4 col2 = texture2D(pTex,uvv.xy+vec2(0.0,-1.0) *pixel);
  vec4 col3 = texture2D(pTex,uvv.xy+vec2(1.0,-1.0) *pixel);
      
  vec4 col4 = texture2D(pTex,uvv.xy+vec2(-1.0,0.0) *pixel);
  vec4 col5 = texture2D(pTex,uvv.xy+vec2(0.0,0.0)  *pixel);
  vec4 col6 = texture2D(pTex,uvv.xy+vec2(1.0,0.0)  *pixel);

  vec4 col7 = texture2D(pTex,uvv.xy+vec2(-1.0,1.0) *pixel);
  vec4 col8 = texture2D(pTex,uvv.xy+vec2(0.0,1.0)  *pixel);
  vec4 col9 = texture2D(pTex,uvv.xy+vec2(1.0,1.0)  *pixel);

  //https://en.wikipedia.org/wiki/Unsharp_masking
  //https://imagingsolution.net/imaging/unsharpmasking/
  //元画像＋(元画像－平滑化画像)*k＝シャープ化画像
  float k = 2.0;
  vec4 col = abs(col4-col6)*1.0;

  col = col5;// - col;

  //col = col5 - col;

  //col += (col5 - col6) * 0.5;

  return col;
}


#pragma glslify: export(unsharp)