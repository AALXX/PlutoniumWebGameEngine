// * WebGl
export var webGl;
//* Setting up webGl rendering context
export class WebGlUtilities {
}
WebGlUtilities.initialize = (elementId) => {
    let canvas;
    if (elementId !== undefined) {
        canvas = document.getElementById(elementId);
        if (canvas === undefined) {
            throw new Error("Can Not find a canvas named" + elementId);
        }
    }
    else {
        throw new Error("U don't have a canvas in inedx.html");
    }
    webGl = canvas.getContext("webgl");
    if (webGl == undefined) {
        throw new Error("Unable to init WebGl");
    }
    return canvas;
};
