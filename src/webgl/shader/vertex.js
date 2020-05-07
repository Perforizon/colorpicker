import Locations from "./locations";
export default `
    attribute vec3 ${Locations.POSITION};
    uniform mediump mat4 ${Locations.TRANSFORM};
    void main(void)
    {
        gl_Position = transformMatrix * vec4(${Locations.POSITION}, 1.0);
    }
`