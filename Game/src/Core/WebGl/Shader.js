import { webGl } from "./WebGl.js";
//* Rprezents Web Gl shader
export class Shader {
    //* @params name = name Of Shader, 
    //* @params VertexShader = VertexShaderSource, 
    //* @params FragmentShader = FragmentShaderSource, 
    constructor(name, vertexSource, fragmentSource) {
        this._attributes = {};
        this._uniforms = {};
        //* Use this Shader
        this.use = () => {
            webGl.useProgram(this._program);
        };
        //* Get atribute location with given name
        this.getAtributeLocation = (name) => {
            if (this._attributes[name] === undefined)
                throw new Error(`Unable to find atribute name "${name}" in shader: "${this.name}"`);
            return this._attributes[name];
        };
        //* Get uniform location with given name
        this.getUniformLocation = (name) => {
            if (this._uniforms[name] === undefined)
                throw new Error(`Unable to find uniform name "${name}" in shader: "${this.name}"`);
            return this._uniforms[name];
        };
        //* Functioan To load the shader
        this.LoadShader = (source, shaderType) => {
            let shader = webGl.createShader(shaderType);
            webGl.shaderSource(shader, source);
            webGl.compileShader(shader);
            let error = webGl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error(`ERROR compiling shader ${this._name}  : ${error}`);
            }
            return shader;
        };
        this.CreateProgram = (vertexShader, fragmentShader) => {
            this._program = webGl.createProgram();
            webGl.attachShader(this._program, vertexShader);
            webGl.attachShader(this._program, fragmentShader);
            webGl.linkProgram(this._program);
            let error = webGl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error(`ERROR linking shader ${this._name}  : ${error}`);
            }
        };
        //* Gets the location of Attributes
        this.DetectAttributes = () => {
            let atributeCount = webGl.getProgramParameter(this._program, webGl.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < atributeCount; i++) {
                let atributeInfo = webGl.getActiveAttrib(this._program, i);
                if (!atributeInfo) {
                    break;
                }
                this._attributes[atributeInfo.name] = webGl.getAttribLocation(this._program, atributeInfo.name);
            }
        };
        //* Go trough shader and get all the names
        this.DetectUniforms = () => {
            let uniformCount = webGl.getProgramParameter(this._program, webGl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                let UniformInfo = webGl.getActiveUniform(this._program, i);
                if (!UniformInfo) {
                    break;
                }
                this._uniforms[UniformInfo.name] = webGl.getUniformLocation(this._program, UniformInfo.name);
            }
        };
        this._name = name;
        let VertexShader = this.LoadShader(vertexSource, webGl.VERTEX_SHADER);
        let FragmentShader = this.LoadShader(fragmentSource, webGl.FRAGMENT_SHADER);
        this.CreateProgram(VertexShader, FragmentShader);
        this.DetectAttributes();
        this.DetectUniforms();
    }
    //* The name of the shader
    get name() {
        return this._name;
    }
}
