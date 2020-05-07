import React, { useRef, useEffect, useState } from "react";
import InitWebglCanvas from "../webgl/init-canvas";
import ColorPickerElementRenderer from "../webgl/renderer";
import GLC from "../webgl/webgl-commander";
import {SubShaderType} from "../webgl/shader/subshader-type";
import {VEC4, VEC2} from "@perforizon/math";

interface Props extends Omit<React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "color"> {
  color : VEC4,
  subShaderType : SubShaderType,
  patternColor0 ?: VEC4,
  patternColor1 ?: VEC4,
  patternSize ?: VEC2,
  opacity ?: number
}

export const WebglColorPickerCanvas = (props : Props) => {
  // omit color from forwarded props
  const {color, ...forwardProps} = props;
  const ref = useRef(null);
  const [sbgRenderer, setSBGRenderer] = useState<ColorPickerElementRenderer>(null);

  useEffect(() => {
    const glc = new GLC();
    setSBGRenderer(
      InitWebglCanvas(
        ref.current,
        props.color,
        props.subShaderType,
        glc,
        props.patternColor0,
        props.patternColor1,
        props.patternSize,
        props.opacity
      )
    );
  }, [ref]);

  useEffect(() => {
    if (sbgRenderer) {
      sbgRenderer.instance.color =[
        props.color[0],
        props.color[1],
        props.color[2],
        1.0
      ];
    }
  }, [props.color]);

  useEffect(() => {
    if (sbgRenderer && props.opacity) {
      sbgRenderer.instance.opacity = props.opacity;
    }
  }, [props.opacity]);

  return (
    <canvas
      ref={ref}
      {...forwardProps}
      onMouseDown={(e: React.MouseEvent) => {
        e.preventDefault();
      }}
    />
  );
};