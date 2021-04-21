// import { webGl } from "./WebGl.js"
import { webGl } from './WebGl.js';
//* the information needed for WebGlBuffer
export class AttributeInfo {
}
//* Weg gb Buffer
export class WebGlBuffer {
    //* Create a new WebGl Buffer
    //* @elementSize
    constructor(elementSize, dataType = webGl.FLOAT, targetBufferType = webGl.ARRAY_BUFFER, drawingMode = webGl.TRIANGLES) {
        this._hasAttributeLocation = false;
        this._data = [];
        this._attributes = [];
        //* Destroys the buffer
        this.Destroy = () => {
            webGl.deleteBuffer(this._buffer);
        };
        //* Bindes the buffer
        this.Bind = (normalized = false) => {
            webGl.bindBuffer(this._targetBufferType, this._buffer);
            if (this._hasAttributeLocation) {
                for (let it of this._attributes) {
                    webGl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stide, it.offset * this._typeSize);
                    webGl.enableVertexAttribArray(it.location);
                }
            }
        };
        //* unBindes The buffer
        this.UnBind = () => {
            for (let it of this._attributes) {
                webGl.disableVertexAttribArray(it.location);
            }
            webGl.bindBuffer(this._targetBufferType, this._buffer);
        };
        //* Adds an atribute with given info to buffer
        this.addAttributeLocation = (info) => {
            this._hasAttributeLocation = true;
            this._attributes.push(info);
        };
        //*Add data to this buffer
        this.PushBackData = (data) => {
            for (let d of data) {
                this._data.push(d);
            }
        };
        //*Upload buffer data to gpu
        this.Upload = () => {
            webGl.bindBuffer(this._targetBufferType, this._buffer);
            let bufferData;
            switch (this._dataType) {
                case webGl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case webGl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case webGl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case webGl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case webGl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case webGl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case webGl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
            }
            webGl.bufferData(this._targetBufferType, bufferData, webGl.STATIC_DRAW);
        };
        //* Draw this buffer
        this.Draw = () => {
            if (this._targetBufferType === webGl.ARRAY_BUFFER) {
                webGl.drawArrays(this._drawingMode, 0, this._data.length / this._elementSize);
            }
            else if (this._targetBufferType === webGl.ELEMENT_ARRAY_BUFFER) {
                webGl.drawElements(this._drawingMode, this._data.length, this._dataType, 0);
            }
        };
        this._elementSize = elementSize;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._drawingMode = drawingMode;
        //* Determine byte size
        switch (this._dataType) {
            case webGl.FLOAT:
            case webGl.INT:
            case webGl.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case webGl.SHORT:
            case webGl.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case webGl.BYTE:
            case webGl.UNSIGNED_BYTE:
                this._typeSize = 1;
                break;
            default:
                throw new Error(`Unrecognized dataType: ${dataType.toString()}`);
        }
        this._stide = this._elementSize * this._typeSize;
        this._buffer = webGl.createBuffer();
    }
}
