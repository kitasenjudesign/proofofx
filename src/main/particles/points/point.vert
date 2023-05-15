  uniform float pointSize;
  uniform float cameraConstant;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = pointSize * cameraConstant / (-mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }