import React from "react";
import {OpacityCanvas} from "./opacity-canvas";
import {SwatchCanvas} from "./swatch-canvas";
import {SaturationBrightnessCanvas} from "./saturation-brightness-canvas"; 
import {HueCanvas} from './hue-canvas';

export default {
  title: "WebglColorPickerCanvas"
};

export const SaturationBrightness = () => <SaturationBrightnessCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]} 
/>;

export const Opacity = () => <OpacityCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]}
    patternColor0={[.7,.7,.7,.7]} 
    patternColor1={[.4,.4,.4,.7]}
    patternSize={8}
/>;

export const Swatch = () => <SwatchCanvas 
    width={256} 
    height={256} 
    color={[1, 0, 0, 1]} 
    patternColor0={[.7,.7,.7,.7]} 
    patternColor1={[.4,.4,.4,.7]}
    patternSize={8}
    opacity={.4}
/>;

export const Hue = () => <HueCanvas width={256} height={256} />;
