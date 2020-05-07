import GLC from "./webgl-commander";
import Shader from "./shader";
export default class {
  vertices: number[];
  indices: number[];
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  glc: GLC;

  constructor(glc: GLC, vertices: number[], indices: number[]) {
    this.glc = glc;
    this.vertices = vertices;
    this.indices = indices;
    this._genVertexBuffer();
    this._genIndexBuffer();
  }

  _genVertexBuffer() {
    this.vertexBuffer = this.glc.createBuffer();
    this.glc.bindArrayBuffer(this.vertexBuffer);
    this.glc.addArrayBufferData(this.vertices);
    this.glc.unbindArrayBuffer();
  }

  _genIndexBuffer() {
    this.indexBuffer = this.glc.createBuffer();
    this.glc.bindElementArrayBuffer(this.indexBuffer);
    this.glc.addElementArrayBufferData(this.indices);
    this.glc.unbindElementArrayBuffer();
  }

  use(shader: Shader) {
    this.glc.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();
    this.glc.bindElementArrayBuffer(this.indexBuffer);
  }
}
