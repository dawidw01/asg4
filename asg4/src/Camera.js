class Camera {
    constructor() {
        this.eye = new Vector(-1.5, 2, 15);
        this.at = new Vector(10, 10, -100);
        this.up = new Vector(0, 1, 0);
        this.pitch = 0;
    }

    forward() {
        var f = this.at.subtract(this.eye);
        f = f.divide(f.length());
        this.at = this.at.add(f);
        this.eye = this.eye.add(f);
    }

    back() {
        var f = this.eye.subtract(this.at);
        f = f.divide(f.length());
        this.at = this.at.add(f);
        this.eye = this.eye.add(f);
    }

    left() {
        var f = this.eye.subtract(this.at);
        f = f.divide(f.length());
        var s = f.cross(this.up);
        s = s.divide(s.length());
        this.at = this.at.add(s);
        this.eye = this.eye.add(s);
    }

    right() {
        var f = this.eye.subtract(this.at);
        f = f.divide(f.length());
        var s = f.cross(this.up);
        s = s.divide(s.length());
        this.at = this.at.subtract(s);
        this.eye = this.eye.subtract(s);
    }

    rotateLeft() {
        const dir = this.at.subtract(this.eye);
        const up = this.up.normalize();
        const angle = 5 * Math.PI / 180;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // scale the direction vector
        const dirScaled = dir.multiply(cosA);
        // cross product
        const crossProduct = up.cross(dir).multiply(sinA);
        // dot product
        const dotProduct = up.dot(dir);
        // scale the up vector
        const upScaled = up.multiply(dotProduct).multiply(1 - cosA);

        const newDir = dirScaled.add(crossProduct).add(upScaled);
        this.at = this.eye.add(newDir);
    }

    rotateRight() {
        const dir = this.at.subtract(this.eye);
        const up = this.up.normalize();
        const angle = 5 * Math.PI / 180;

        const cosA = Math.cos(-angle);
        const sinA = Math.sin(-angle);

        // scale the direction vector
        const dirScaled = dir.multiply(cosA);
        // cross product
        const crossProduct = up.cross(dir).multiply(sinA);
        // dot product
        const dotProduct = up.dot(dir);
        // scale the up vector
        const upScaled = up.multiply(dotProduct).multiply(1 - cosA);

        const newDir = dirScaled.add(crossProduct).add(upScaled);
        this.at = this.eye.add(newDir);
    }

    tiltUp() {
        const maxPitch = 90 * Math.PI / 180;
        const angle = 5 * Math.PI / 180;

        if (this.pitch + angle > maxPitch) return;
        this.pitch += angle;

        this._tilt(angle);
    }

    tiltDown() {
        const minPitch = -90 * Math.PI / 180;
        const angle = -5 * Math.PI / 180;

        if (this.pitch + angle < minPitch) return;
        this.pitch += angle;

        this._tilt(angle);
    }

    // Refactor shared tilt logic here:
    _tilt(angle) {
        const dir = this.at.subtract(this.eye);
        const right = dir.cross(this.up).normalize();

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const dirScaled = dir.multiply(cosA);
        const crossProduct = right.cross(dir).multiply(sinA);
        const dotProduct = right.dot(dir);
        const rightScaled = right.multiply(dotProduct).multiply(1 - cosA);

        const newDir = dirScaled.add(crossProduct).add(rightScaled);
        this.at = this.eye.add(newDir);
    }

}
