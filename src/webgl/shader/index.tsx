import GLC from "../webgl-commander";
import VertexSource from "./vertex";
import FragmentSource from "./fragment";
import Locations from "./locations";
import { VEC2, VEC4, MAT4 } from "@perforizon/math";

export default class {
  positionAttribute: number;
  program: WebGLProgram;
  transformationMatrix: WebGLUniformLocation;
  sbgColor: WebGLUniformLocation;
  patternColor0: WebGLUniformLocation;
  patternColor1: WebGLUniformLocation;
  patternSize: WebGLUniformLocation;
  canvasSize: WebGLUniformLocation;
  subShaderType: WebGLUniformLocation;
  opacity: WebGLUniformLocation;
  glc: GLC;

  constructor(glc: GLC) {
    this.glc = glc;
    const vertexShader = this.glc.createVertexShader();
    this.glc.addShaderSource(vertexShader, VertexSource);
    this.glc.compileShader(vertexShader);

    const fragmentShader = this.glc.createFragmentShader();
    this.glc.addShaderSource(fragmentShader, FragmentSource);
    this.glc.compileShader(fragmentShader);
    this.program = this.glc.createShaderProgram();
    this.glc.attachShaderToProgram(this.program, vertexShader);
    this.glc.attachShaderToProgram(this.program, fragmentShader);
    this.glc.linkProgram(this.program);

    this.positionAttribute = this.glc.getAttributeLocation(
      this.program,
      Locations.POSITION
    );
    this.transformationMatrix = this.glc.getUniformLocation(
      this.program,
      Locations.TRANSFORM
    );
    this.sbgColor = this.glc.getUniformLocation(this.program, Locations.COLOR);
    this.patternColor0 = this.glc.getUniformLocation(
      this.program,
      Locations.PATTERN_COLOR0
    );
    this.patternColor1 = this.glc.getUniformLocation(
      this.program,
      Locations.PATTERN_COLOR1
    );
    this.patternSize = this.glc.getUniformLocation(
      this.program,
      Locations.PATTERN_SIZE
    );
    this.opacity = this.glc.getUniformLocation(this.program, Locations.OPACITY);
    this.canvasSize = this.glc.getUniformLocation(this.program, Locations.SIZE);
    this.subShaderType = this.glc.getUniformLocation(
      this.program,
      Locations.SUBSHADERTYPE
    );
  }

  use() {
    this.glc.useProgram(this.program);
  }

  enablePosition() {
    this.glc.enableVertexAttribArray(this.positionAttribute);
    this.glc.pointToAttribute(this.positionAttribute, 3);
  }

  enableTransformationMatrix(matrix: MAT4) {
    this.glc.uploadMatrix4fv(this.transformationMatrix, matrix);
  }

  enableColor(color: VEC4) {
    this.glc.uploadVec4Uniform(this.sbgColor, color);
  }

  enablePatternColor0(color: VEC4) {
    this.glc.uploadVec4Uniform(this.patternColor0, color);
  }

  enablePatternColor1(color: VEC4) {
    this.glc.uploadVec4Uniform(this.patternColor1, color);
  }

  enablePatternSize(size: VEC2) {
    this.glc.uploadVec2Uniform(this.patternSize, size);
  }

  enableSize(size: VEC2) {
    this.glc.uploadVec2Uniform(this.canvasSize, size);
  }

  enableOpacity(opacity: number) {
    this.glc.upload1FUniform(this.opacity, opacity);
  }

  enableSubShaderType(subShaderType: number) {
    this.glc.uploadInt(this.subShaderType, subShaderType);
  }
}
