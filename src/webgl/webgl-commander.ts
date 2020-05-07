import { VEC2, VEC4, MAT4} from "@perforizon/math";

export default class {
  gl: WebGLRenderingContext;
  init(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.gl.enable(gl.BLEND);
    this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }
  clear(r: number, g: number, b: number, a: number) {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  viewport() {
    return this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }
  depthTest(use: boolean) {
    return use
      ? this.gl.enable(this.gl.DEPTH_TEST)
      : this.gl.disable(this.gl.DEPTH_TEST);
  }
  // float buffers
  createBuffer() {
    return this.gl.createBuffer();
  }
  bindArrayBuffer(buffer: WebGLBuffer) {
    return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  }
  unbindArrayBuffer() {
    return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }
  addArrayBufferData(vertices: number[]) {
    return this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    );
  }
  // int buffers
  bindElementArrayBuffer(buffer: WebGLBuffer) {
    return this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  }
  unbindElementArrayBuffer() {
    return this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }
  addElementArrayBufferData(vertices: number[]) {
    return this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(vertices),
      this.gl.STATIC_DRAW
    );
  }

  //shader functions
  createVertexShader() {
    return this.gl.createShader(this.gl.VERTEX_SHADER);
  }
  createFragmentShader() {
    return this.gl.createShader(this.gl.FRAGMENT_SHADER);
  }
  addShaderSource(shader: WebGLShader, source: string): void {
    this.gl.shaderSource(shader, source);
  }
  compileShader(shader: WebGLShader): void {
    this.gl.compileShader(shader);
  }
  createShaderProgram() {
    return this.gl.createProgram();
  }
  attachShaderToProgram(program: WebGLProgram, shader: WebGLShader) {
    return this.gl.attachShader(program, shader);
  }
  linkProgram(program: WebGLProgram) {
    this.gl.linkProgram(program);
  }
  useProgram(program: WebGLProgram) {
    return this.gl.useProgram(program);
  }
  getAttributeLocation(program: WebGLProgram, attribute: string) {
    return this.gl.getAttribLocation(program, attribute);
  }
  enableVertexAttribArray(attribute: number) {
    return this.gl.enableVertexAttribArray(attribute);
  }
  pointToAttribute(data: number, dimensions: number) {
    return this.gl.vertexAttribPointer(
      data,
      dimensions,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  drawTriangles(numOfIndices: number) {
    return this.gl.drawElements(
      this.gl.TRIANGLES,
      numOfIndices,
      this.gl.UNSIGNED_SHORT,
      0
    );
  }

  upload1FUniform(location: WebGLUniformLocation, value: number) {
    this.gl.uniform1f(location, value);
  }

  uploadVec2Uniform(location: WebGLUniformLocation, value: VEC2) {
    this.gl.uniform2fv(location, value);
  }

  uploadVec4Uniform(location: WebGLUniformLocation, value: VEC4) {
    this.gl.uniform4f(location, value[0], value[1], value[2], value[3]);
  }

  uploadMatrix4fv(location: WebGLUniformLocation, value: MAT4) {
    this.gl.uniformMatrix4fv(location, false, value);
  }

  uploadInt(location: WebGLUniformLocation, value: number) {
    this.gl.uniform1i(location, value);
  }

  getUniformLocation(program: WebGLProgram, uniform: string) {
    return this.gl.getUniformLocation(program, uniform);
  }
}
