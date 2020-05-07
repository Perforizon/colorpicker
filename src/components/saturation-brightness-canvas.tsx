import React from "react";
import {VEC4} from "@perforizon/math";
import {WebglColorPickerCanvas} from "./webgl-color-picker-canvas";
import { SubShaderType } from "../webgl/shader/subshader-type";

export interface SaturationBrightnessCanvasProps extends Omit<Omit<Omit<React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "color">, "height">, "width">{
    width : number,
    height : number,
    color : VEC4,
}
export const SaturationBrightnessCanvas = (props : SaturationBrightnessCanvasProps) =>
{
    return (
        <WebglColorPickerCanvas
            {...props}
            subShaderType={SubShaderType.SATURATION_BRIGHTNESS}
        />
    )
}