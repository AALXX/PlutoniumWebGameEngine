// * WebGl

export var webGl: WebGLRenderingContext;

//* Setting up webGl rendering context
export class WebGlUtilities {

    public static initialize = (elementId?: string): HTMLCanvasElement => {
        let canvas: HTMLCanvasElement;

        if (elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;

            if (canvas === undefined){
                throw new Error("Can Not find a canvas named" + elementId)
            }
            
        }else{
            throw new Error("U don't have a canvas in inedx.html")
        }
        
        webGl = canvas.getContext( "webgl" );
        if (webGl == undefined){
            
            throw new Error("Unable to init WebGl")
        }
        return canvas;
    }
}