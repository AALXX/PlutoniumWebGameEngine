export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    //* getters and setter for x 
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    //* getters and setter for y 
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    //* getters and setter for z 
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
    }
    toArray() {
        return [this._x, this._y, this._z];
    }
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }
}
