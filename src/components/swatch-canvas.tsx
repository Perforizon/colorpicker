import React from "react";
import {VEC4} from "@perforizon/math";
import {WebglColorPickerCanvas} from "./webgl-color-picker-canvas";
import { SubShaderType } from "../webgl/shader/subshader-type";

export interface SwatchCanvasProps extends Omit<Omit<Omit<React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "color">, "height">, "width">{
    width : number,
    height : number,
    color : VEC4,
    patternColor0 : VEC4,
    patternColor1 : VEC4,
    patternSize : number,
    opacity : number
}
export const SwatchCanvas = (props : SwatchCanvasProps) =>
{
    return (
        <WebglColorPickerCanvas
            {...props}
            subShaderType={SubShaderType.SWATCH}
        />
    )
}