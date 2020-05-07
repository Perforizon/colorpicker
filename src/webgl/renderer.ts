import GLC from "./webgl-commander";
import Shader from "./shader";
import ModelType from "./model";
import ModelInstance from "./model-instance";
type ModelRecord = Record<
  string,
  { type: ModelType; instances: ModelInstance[] }
>;

export default class {
  shader: Shader;
  instance: ModelInstance;
  modelType: ModelType;
  glc: GLC;

  constructor(glc: GLC) {
    this.shader = new Shader(glc);
    this.glc = glc;
  }

  registerModel(modelType: ModelType) {
    this.modelType = modelType;
  }

  registerInstance(instance: ModelInstance) {
    this.instance = instance;
  }

  preRender() {
    this.glc.depthTest(true);
  }

  render() {
    this.glc.depthTest(true);
    this.shader.use();
    this.preRender();
    this.modelType.use(this.shader);
    this.shader.enableTransformationMatrix(this.instance.transformationMatrix);
    this.shader.enableColor(this.instance.color);
    this.shader.enablePatternColor0(this.instance.patternColor0);
    this.shader.enablePatternColor1(this.instance.patternColor1);
    this.shader.enablePatternSize(this.instance.patternSize);
    this.shader.enableSize(this.instance.canvasSize);
    this.shader.enableOpacity(this.instance.opacity);
    this.shader.enableSubShaderType(this.instance.subShaderType);
    this.glc.drawTriangles(this.modelType.indices.length);
  }
}
