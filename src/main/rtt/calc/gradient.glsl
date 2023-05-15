// 勾配計算関数
vec2 gradient(sampler2D pTex, vec2 texCoord, vec2 resolution, float scale) {

  vec2 pixelSize = scale / resolution;


  vec2 leftOffset = vec2(-pixelSize.x, 0.0);
  vec2 rightOffset = vec2(pixelSize.x, 0.0);
  vec2 upOffset = vec2(0.0, -pixelSize.y);
  vec2 downOffset = vec2(0.0, pixelSize.y);
  float left = texture2D(pTex,texCoord+leftOffset).x;
  float right = texture2D(pTex,texCoord+rightOffset).r;
  float up = texture2D(pTex,texCoord+upOffset).r;
  float down = texture2D(pTex,texCoord+downOffset).r;

  vec2 grad;
  grad.x = (right - left) * 0.5;
  grad.y = (down - up) * 0.5;
    
  return grad;

}

#pragma glslify: export(gradient)