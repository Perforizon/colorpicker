import React from "react";
import {WebglColorPickerCanvas} from "./webgl-color-picker-canvas";
import {VEC4} from "@perforizon/math";
import { SubShaderType } from "../webgl/shader/subshader-type";

export interface OpacityCanvasProps extends Omit<Omit<Omit<React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "color">, "height">, "width">{
    width : number,
    height : number,
    color : VEC4,
    patternColor0 : VEC4,
    patternColor1 : VEC4,
    patternSize : number,
}
export const OpacityCanvas = (props : OpacityCanvasProps) =>
{
    return (
        <WebglColorPickerCanvas
            {...props}
            subShaderType={SubShaderType.OPACITY}
        />
    )
}