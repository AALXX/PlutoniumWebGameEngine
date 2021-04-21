export class Matrix4x4 {
    constructor() {
        this._data = [];
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }
    get data() {
        return this._data;
    }
    static identity() {
        return new Matrix4x4();
    }
    //* ortographic Matrix
    static orthographic(left, right, bottom, top, nearClip, farClip) {
        let matrix = new Matrix4x4();
        let LeftRight = 1.0 / (left - right);
        let BottomTop = 1.0 / (bottom - top);
        let NearFar = 1.0 / (nearClip - farClip);
        matrix._data[0] = -2.0 * LeftRight;
        matrix._data[5] = -2.0 * BottomTop;
        matrix._data[10] = 2.0 * NearFar;
        matrix._data[12] = (left + right) * LeftRight;
        matrix._data[13] = (top + bottom) * BottomTop;
        matrix._data[14] = (nearClip + farClip) * NearFar;
        return matrix;
    }
    static translation(position) {
        let matrix = new Matrix4x4();
        matrix._data[12] = position.x;
        matrix._data[13] = position.y;
        matrix._data[14] = position.z;
        return matrix;
    }
    toFloat32Array() {
        return new Float32Array(this._data);
    }
}
