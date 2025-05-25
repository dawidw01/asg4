class Sphere {
    constructor() {
        this.type = 'sphere';
        // this.position = [0.0, 0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
        // this.normalMatrix = new Matrix4();
        this.textureNum = -2;
        
        // Cache vertices and UVs
        this.v = [];
        this.uv = [];
        this.v2 = [];
        this.uv2 = [];
        // this.normals = [];
        
        // Reduced segment count from 25 to 15
        var d = Math.PI / 15;
        var dd = Math.PI / 15;

        // Pre-calculate all vertices, UVs and normals
        for (var t = 0; t < Math.PI; t += d) {
            for (var r = 0; r < (2 * Math.PI); r += d) {
                var p1 = [sin(t) * cos(r), sin(t) * sin(r), cos(t)];
                var p2 = [sin(t + dd) * cos(r), sin(t + dd) * sin(r), cos(t + dd)];
                var p3 = [sin(t) * cos(r + dd), sin(t) * sin(r + dd), cos(t)];
                var p4 = [sin(t + dd) * cos(r + dd), sin(t + dd) * sin(r + dd), cos(t + dd)];

                var uv1 = [t / Math.PI, r / (2 * Math.PI)];
                var uv2 = [(t + dd) / Math.PI, r / (2 * Math.PI)];
                var uv3 = [t / Math.PI, (r + dd) / (2 * Math.PI)];
                var uv4 = [(t + dd) / Math.PI, (r + dd) / (2 * Math.PI)];

                // First triangle
                this.v = this.v.concat(p1, p2, p4);
                this.uv = this.uv.concat(uv1, uv2, uv4);
                // this.normals = this.normals.concat(p1, p2, p4);

                // Second triangle
                this.v2 = this.v2.concat(p1, p4, p3);
                this.uv2 = this.uv2.concat(uv1, uv4, uv3);
                // this.normals = this.normals.concat(p1, p4, p3);
            }
        }
    }

    render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;

        // Pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);

        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.uniform4f(u_FragColor, 1, 1, 1, 1);
        drawTriangle3DUVNormal(this.v, this.uv, this.v);

        gl.uniform4f(u_FragColor, 1, 0, 0, 1);
        drawTriangle3DUVNormal(this.v2, this.uv2, this.v2);
    }
}

function sin(x) {
    return Math.sin(x);
}

function cos(x) {
    return Math.cos(x);
}