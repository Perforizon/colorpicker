import GLC from "./webgl-commander";
import SBGRenderer from "./renderer";
import ModelType from "./model";
import ModelInstance from "./model-instance";
import { VEC4, VEC2 } from "@perforizon/math";

export default (
  canvas: HTMLCanvasElement,
  color: VEC4,
  subShaderType: number,
  glc: GLC,
  patternColor0?: VEC4,
  patternColor1?: VEC4,
  patternSize?: VEC2,
  opacity?: number
) => {
  if (!canvas) return;
  const context = canvas.getContext("webgl");
  if (!context) return;
  glc.init(context);

  // quad that encompasses the entire canvas
  const vertices = [-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0];
  const indices = [0, 1, 2, 0, 2, 3];
  //
  const renderer = new SBGRenderer(glc);
  renderer.registerModel(new ModelType(glc, vertices, indices));
  const instance = new ModelInstance(
    color,
    opacity,
    [canvas.width, canvas.height],
    subShaderType,
    patternColor0,
    patternColor1,
    patternSize
  );
  renderer.registerInstance(instance);
  const render = () => {
    glc.clear(0.0, 0.0, 0.0, 0.0);
    renderer.render();
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
  return renderer;
};
