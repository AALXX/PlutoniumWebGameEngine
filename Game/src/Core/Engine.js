import { WebGlUtilities, webGl } from './WebGl/WebGl.js';
import { Shader } from "./WebGl/Shader.js";
import { Sprite } from "./Graphics/Sprite.js";
import { Matrix4x4 } from '../Math/matrix4x4.js';
export class PlutoniumEngine {
    // * A instance of Engine is created
    constructor() {
        // * Start method when game start
        this.start = () => {
            this._canavs = WebGlUtilities.initialize("RenderSpace");
            webGl.clearColor(0, 0.5, 1, 1);
            this.LoadShaders();
            this._shader.use();
            //*Load
            this._projection = Matrix4x4.orthographic(0, this._canavs.width, 0, this._canavs.height, -100.0, 100.0);
            this._sprite = new Sprite("test");
            this._sprite.load();
            this._sprite.position.x = 20;
            this._sprite.position.y = 20;
            this.resize();
            this.Update();
        };
        //* Resize Canavs to fit window
        this.resize = () => {
            if (this._canavs !== undefined) {
                this._canavs.width = window.innerWidth;
                this._canavs.height = window.innerHeight;
                webGl.viewport(-1, 1, webGl.canvas.width, webGl.canvas.height);
            }
        };
        // * Loop method update game
        this.Update = () => {
            webGl.clear(webGl.COLOR_BUFFER_BIT);
            //* Set Uniforms
            let ColorPosition = this._shader.getUniformLocation("uniform_color");
            webGl.uniform4f(ColorPosition, 0, 1, 0, 1);
            let projectionPosition = this._shader.getUniformLocation("u_projection");
            webGl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            let ModelLocation = this._shader.getUniformLocation("u_model");
            webGl.uniformMatrix4fv(ModelLocation, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));
            this._sprite.Draw();
            //*Call this instance update
            requestAnimationFrame(this.Update.bind(this));
        };
        this.LoadShaders = () => {
            let VertexShaderSource = `
        attribute vec3 a_position;
        uniform mat4 u_projection;
        uniform mat4 u_model;
        void main() {
            gl_Position = vec4(a_position, 1.0);
            gl_Position = u_projection * u_model * vec4(a_position, 1.0);
        }`;
            let FragmentShaderSource = `
        precision mediump float;
        uniform vec4 uniform_color;
        void main(){
            gl_FragColor = uniform_color;
        }`;
            this._shader = new Shader("basic", VertexShaderSource, FragmentShaderSource);
        };
    }
}
