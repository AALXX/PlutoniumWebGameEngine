import { Vector3 } from "./vector3.js"

export class Matrix4x4 {

  private _data: number[] = [];

  private constructor() {
    this._data = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  }

  public get data(): number[] {

    return this._data;
  }

  public static identity(): Matrix4x4 {

    return new Matrix4x4();
  }

  //* ortographic Matrix

  public static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4 {

    let matrix = new Matrix4x4();

    let LeftRight: number = 1.0 / (left - right);
    let BottomTop: number = 1.0 / (bottom - top);
    let NearFar: number = 1.0 / (nearClip - farClip);

    matrix._data[0] = -2.0 * LeftRight;
    matrix._data[5] = -2.0 * BottomTop;
    matrix._data[10] = 2.0 * NearFar;

    matrix._data[12] = (left + right) * LeftRight;
    matrix._data[13] = (top + bottom) * BottomTop;
    matrix._data[14] = (nearClip + farClip) * NearFar;


    return matrix;
  }

  public static translation(position: Vector3): Matrix4x4 {
    let matrix = new Matrix4x4();

    matrix._data[12] = position.x;
    matrix._data[13] = position.y;
    matrix._data[14] = position.z;

    return matrix;
  }

  public toFloat32Array(): Float32Array {
    return new Float32Array(this._data);
  }
}