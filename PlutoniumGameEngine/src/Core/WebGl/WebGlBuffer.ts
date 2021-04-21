// import { webGl } from "./WebGl.js"
import { webGl } from './WebGl.js';

//* the information needed for WebGlBuffer
export class AttributeInfo {

  //* location of the attribute
  public location: number;

  //* the size (numb of elemets) in the atribute
  public size: number;

  //* The number of elements from the begnening of the buffer
  public offset: number;
}

//* Weg gb Buffer
export class WebGlBuffer {

  private _hasAttributeLocation: boolean = false;
  private _elementSize: number;
  private _stide: number;
  private _buffer: WebGLBuffer;

  private _targetBufferType: number;
  private _dataType: number;
  private _drawingMode: number;
  private _typeSize: number;

  private _data: number[] = [];
  private _attributes: AttributeInfo[] = [];

  //* Create a new WebGl Buffer
  //* @elementSize

  public constructor(elementSize: number, dataType: number = webGl.FLOAT, targetBufferType: number = webGl.ARRAY_BUFFER, drawingMode: number = webGl.TRIANGLES) {
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

  //* Destroys the buffer
  public Destroy = (): void => {
    webGl.deleteBuffer(this._buffer);
  }

  //* Bindes the buffer
  public Bind = (normalized: boolean = false): void => {
    webGl.bindBuffer(this._targetBufferType, this._buffer);
    if (this._hasAttributeLocation) {
      for (let it of this._attributes) {
        webGl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stide, it.offset * this._typeSize);
        webGl.enableVertexAttribArray(it.location);
      }
    }
  }

  //* unBindes The buffer
  public UnBind = (): void => {
    for (let it of this._attributes) {
      webGl.disableVertexAttribArray(it.location);
    }
    
    webGl.bindBuffer(this._targetBufferType, this._buffer)
  }

  //* Adds an atribute with given info to buffer
  public addAttributeLocation = (info: AttributeInfo):void => {
    this._hasAttributeLocation = true;
    this._attributes.push(info);
  }

  //*Add data to this buffer
  public PushBackData = (data: number[]): void => {
    for (let d of data) {
      this._data.push(d);
    }

  }

  //*Upload buffer data to gpu
  public Upload = (): void => {
    
    webGl.bindBuffer(this._targetBufferType, this._buffer);
    
    let bufferData: ArrayBuffer;

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
  }

  //* Draw this buffer
  public Draw = ():void => {
    if (this._targetBufferType === webGl.ARRAY_BUFFER) {
      webGl.drawArrays(this._drawingMode, 0, this._data.length / this._elementSize);
    } else if (this._targetBufferType === webGl.ELEMENT_ARRAY_BUFFER){
      webGl.drawElements(this._drawingMode, this._data.length, this._dataType, 0);
    }
  }
}