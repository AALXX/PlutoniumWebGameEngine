import { WebGlBuffer, AttributeInfo } from "../WebGl/WebGlBuffer.js"
import { Vector3 } from '../../Math/vector3.js';

export class Sprite {

  private _name: string;
  private _width: number;
  private _height: number;
  private _buffer: WebGlBuffer;

  public position: Vector3 = new Vector3();;

  public constructor(name: string, width: number = 100, height: number = 100) {
    this._name = name;
    this._width = width;
    this._height = height;
  }

  public load(): void {
    this._buffer = new WebGlBuffer(3);

    let PositionAttribute = new AttributeInfo();
    PositionAttribute.location = 0;
    PositionAttribute.offset = 0;
    PositionAttribute.size = 3;

    this._buffer.addAttributeLocation(PositionAttribute)

    let vertices = [
      //*x y z
      0, 0, 0,
      0, this._height, 0,
      this._width, this._height, 0,

      this._width, this._height, 0,
      this._width, 0, 0,
      0, 0, 0

    ];

    this._buffer.PushBackData(vertices);
    this._buffer.Upload();
    this._buffer.UnBind();
  }

  public update(time: number): void {

  }

  public Draw(): void {
    this._buffer.Bind();
    this._buffer.Draw();
  }
}