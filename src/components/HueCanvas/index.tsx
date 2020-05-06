import React, { useEffect, useRef } from "react";
import { Tex2DGradY } from "@perforizon/math"
import { GradToHue } from "@perforizon/math-color";

export const HueCanvas = (props: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>) => {
  const ref = useRef(null);
  useEffect(() => {
    const _width = Number(props.width);
    const _height = Number(props.height);
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      let imageData = ctx?.createImageData(_width, _height);

      if (ctx && imageData) {
        const pixelCount = _width * _height;

        for (let i = 0; i < pixelCount * 4; i += 4) {
          const gradY = Tex2DGradY(
            _width,
            _height,
            i / 4
          );
          const hueColor = GradToHue(1 - gradY);
          // for each color channel within this pixel
          // R:
          imageData.data[i + 0] = hueColor[0] * 255;
          // G:
          imageData.data[i + 1] = hueColor[1] * 255;
          // B:
          imageData.data[i + 2] = hueColor[2] * 255;
          // A:
          imageData.data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [ref, props.width, props.height]);

  return (
    <canvas
        ref={ref}
        {...props}
    />
  );
};