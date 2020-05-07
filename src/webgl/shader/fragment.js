import Locations from "./locations";
import { SubShaderType } from "./subshader-type";

export default `
    uniform mediump vec4 ${Locations.COLOR};
    uniform mediump vec4 ${Locations.PATTERN_COLOR0};
    uniform mediump vec4 ${Locations.PATTERN_COLOR1};
    uniform mediump vec2 ${Locations.SIZE};
    uniform mediump float ${Locations.PATTERN_SIZE};
    uniform mediump float ${Locations.OPACITY};
    uniform int ${Locations.SUBSHADERTYPE};

    precision highp float;

    float max3fv (vec3 v) {
        return max (max (v.x, v.y), v.z);
    }
    float max3f (float arg1, float arg2, float arg3)
    {
        return max ( max(arg1, arg2), arg3);
    }

    vec4 Checkerboard()
    {
        int checkerboardWidth = int(${Locations.PATTERN_SIZE});
        int checkerboardHeight = int(${Locations.PATTERN_SIZE});
        vec4 _patternColor0 = ${Locations.PATTERN_COLOR0};
        vec4 _patternColor1 = ${Locations.PATTERN_COLOR1};

        int checkerboardOffsetH = ((int(${Locations.SIZE}.y) / 2 / checkerboardHeight) + 1) * checkerboardHeight - int(${Locations.SIZE}.y) / 2;
        int checkerboardOffsetW = ((int(${Locations.SIZE}.x) / 2 / checkerboardWidth) + 1) * checkerboardWidth - int(${Locations.SIZE}.x)  / 2;
        
        vec4 _backgroundColor = _patternColor0;
        int valueW = (int(gl_FragCoord.x) + checkerboardOffsetW) / checkerboardWidth;
        // if we are within one of the columns offset the the row so that it pushes out and creates a checkerboard pattern
        if (floor(mod(float(valueW), 2.0)) > 0.0) 
        checkerboardOffsetH = checkerboardOffsetH + checkerboardHeight;

        int valueH = (int(gl_FragCoord.y) + checkerboardOffsetH) / checkerboardHeight;
        // this check returns true if we are within the checkerboard's other square
        if (floor(mod(float(valueH), 2.0)) > 0.0) 
            _backgroundColor = _patternColor1;

        return _backgroundColor;
    }

    void main(void)
    {
        if(${Locations.SUBSHADERTYPE} == ${SubShaderType.SATURATION_BRIGHTNESS})
        {
            float a = gl_FragCoord.y/${Locations.SIZE}.y;
            float b = 1.0-(gl_FragCoord.x/${Locations.SIZE}.x);

            vec4 _color = ${Locations.COLOR}*a;
            _color = vec4(_color.r, _color.g, _color.b, 1.0);
            float _maxChannel = max3f(_color.r, _color.g, _color.b);
            vec4 _desaturatedColor = vec4(_maxChannel, _maxChannel, _maxChannel, 1.0);
            vec4 _mixedColor = mix(_color, _desaturatedColor, b);

            gl_FragColor = _mixedColor;
        }
        else if (${Locations.SUBSHADERTYPE} == ${SubShaderType.OPACITY})
        {
            float a = (gl_FragCoord.x/${Locations.SIZE}.x);
            vec4 _color = ${Locations.COLOR};
            vec4 _mixedColor = mix(Checkerboard(), _color, a);

            gl_FragColor = _mixedColor;
        }
        else if (${Locations.SUBSHADERTYPE} == ${SubShaderType.SWATCH})
        {
            float a = ${Locations.COLOR}.w;
            vec4 _color = ${Locations.COLOR};
            vec4 _mixedColor = mix(Checkerboard(), _color, ${Locations.OPACITY});

            gl_FragColor = vec4( _mixedColor.r,   _mixedColor.g,   _mixedColor.b, 1.0);
        }
    }
`