import { MAT4, VEC4, VEC2, Mat4Identity } from "@perforizon/math";

// SBG model
// Transform
// Rotation
// SBG color
export default class {
  // transform
  transformationMatrix: MAT4;

  // color
  color: VEC4;
  patternColor0: VEC4;
  patternColor1: VEC4;
  opacity: number;
  // size
  patternSize: number;
  canvasSize: VEC2;
  //
  subShaderType: number;

  constructor(
    color: VEC4,
    opacity: number,
    canvasSize: VEC2,
    subShaderType: number,
    patternColor0?: VEC4,
    patternColor1?: VEC4,
    patternSize?: number
  ) {
    this.transformationMatrix = Mat4Identity;
    this.color = color;
    this.canvasSize = canvasSize;
    this.subShaderType = subShaderType;
    this.opacity = opacity ? opacity : 1;
    this.patternColor0 = patternColor0 ? patternColor0 : [0.8, 0.8, 0.8, 1.0];
    this.patternColor1 = patternColor1 ? patternColor1 : [1.0, 1.0, 1.0, 1.0];
    this.patternSize = patternSize ? patternSize : 16;
  }
}
