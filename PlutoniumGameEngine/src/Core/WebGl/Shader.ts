
import { webGl } from "./WebGl.js"

//* Rprezents Web Gl shader

export class Shader {

    private _name: string;
    private _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {};
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    //* @params name = name Of Shader, 
    //* @params VertexShader = VertexShaderSource, 
    //* @params FragmentShader = FragmentShaderSource, 

    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        let VertexShader = this.LoadShader(vertexSource, webGl.VERTEX_SHADER);
        let FragmentShader = this.LoadShader(fragmentSource, webGl.FRAGMENT_SHADER);

        this.CreateProgram(VertexShader, FragmentShader);
        this.DetectAttributes();
        this.DetectUniforms();
    }

    //* The name of the shader
    public get name(): string {

        return this._name;
    }

    //* Use this Shader
    public use = (): void => {
        webGl.useProgram(this._program);
    }

    //* Get atribute location with given name
    public getAtributeLocation = (name: string): number => {
        if (this._attributes[name] === undefined) throw new Error(`Unable to find atribute name "${name}" in shader: "${this.name}"`)

        return this._attributes[name];
    }

    //* Get uniform location with given name
    public getUniformLocation = (name: string): WebGLUniformLocation => {
        if (this._uniforms[name] === undefined) throw new Error(`Unable to find uniform name "${name}" in shader: "${this.name}"`)

        return this._uniforms[name];
    }

    //* Functioan To load the shader
    private LoadShader = (source: string, shaderType: number): WebGLShader => {

        let shader: WebGLShader = webGl.createShader(shaderType);
        webGl.shaderSource(shader, source);
        webGl.compileShader(shader);
        let error = webGl.getShaderInfoLog(shader);

        if (error !== "") {
            throw new Error(`ERROR compiling shader ${this._name}  : ${error}`);
        }


        return shader;
    }

    private CreateProgram = (vertexShader: WebGLShader, fragmentShader: WebGLShader): void => {

        this._program = webGl.createProgram();

        webGl.attachShader(this._program, vertexShader)
        webGl.attachShader(this._program, fragmentShader)

        webGl.linkProgram(this._program)

        let error = webGl.getProgramInfoLog(this._program);
        if (error !== "") {
            throw new Error(`ERROR linking shader ${this._name}  : ${error}`);

        }

    }

    //* Gets the location of Attributes
    private DetectAttributes = (): void => {
        let atributeCount = webGl.getProgramParameter(this._program, webGl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < atributeCount; i++) {
            let atributeInfo: WebGLActiveInfo = webGl.getActiveAttrib(this._program, i);
            if (!atributeInfo) {
                break;
            }
            this._attributes[atributeInfo.name] = webGl.getAttribLocation(this._program, atributeInfo.name);
        }
    }
    //* Go trough shader and get all the names

    private DetectUniforms = (): void => {
        let uniformCount = webGl.getProgramParameter(this._program, webGl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let UniformInfo: WebGLActiveInfo = webGl.getActiveUniform(this._program, i);
            if (!UniformInfo) {
                break;
            }
            this._uniforms[UniformInfo.name] = webGl.getUniformLocation(this._program, UniformInfo.name);
        }
    }
}
