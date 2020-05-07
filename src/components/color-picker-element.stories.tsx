import React from "react";
import {WebglColorPickerCanvas} from './webgl-color-picker-canvas';
import { SubShaderType } from "../webgl/shader/subshader-type";
import {HueCanvas as _HueCanvas} from './hue-canvas';

export default {
  title: "WebglColorPickerCanvas"
};

export const SaturationBrightness = () => <WebglColorPickerCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]} 
    subShaderType={SubShaderType.SATURATION_BRIGHTNESS} 
/>;

export const Opacity = () => <WebglColorPickerCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]}
    subShaderType={SubShaderType.OPACITY}
    patternColor0={[.7,.7,.7,.7]} 
    patternColor1={[.4,.4,.4,.7]}
    patternSize={[8,8]}
    />;

export const Swatch = () => <WebglColorPickerCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]} 
    subShaderType={SubShaderType.SWATCH} 
    patternColor0={[.7,.7,.7,.7]} 
    patternColor1={[.4,.4,.4,.7]}
    patternSize={[8,8]}
    opacity={.4}
/>;

export const HueCanvas = () => <_HueCanvas width={256} height={256} />;
