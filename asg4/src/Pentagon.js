class Pentagon {
    constructor() {
        this.type = 'pentagon';
    }

    drawPentagon(matrix, color) {
        var rgba = color;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, matrix.elements);

        // Pentagon points on front and back faces
        let angleStep = 360 / 5;
        let front = [];
        let back = [];

        for (let i = 0; i < 5; i++) {
            let angle = (i * angleStep) * Math.PI / 180;
            let x = 0.5 + 0.5 * Math.cos(angle);
            let y = 0.5 + 0.5 * Math.sin(angle);
            front.push([x, y, 0]);
            back.push([x, y, 1]);
        }

        // front face
        for (let i = 0; i < 5; i++) {
            let next = (i + 1) % 5;
            drawTriangle3DUVNormal(
                [0.5, 0.5, 0,
                 front[i][0], front[i][1], front[i][2],
                 front[next][0], front[next][1], front[next][2]],
                [0, 0, 0, 1, 1, 0, 1, 0, 0],
                [0, 0, -1, 0, 0, -1, 0, 0, -1]
            );
        }

        // back face
        for (let i = 0; i < 5; i++) {
            let next = (i + 1) % 5;
            drawTriangle3DUVNormal(
                [0.5, 0.5, 1,
                 back[next][0], back[next][1], back[next][2],
                 back[i][0], back[i][1], back[i][2]],
                [0, 0, 1, 1, 1, 0, 1, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1]
            );
        }

        // side faces
        for (let i = 0; i < 5; i++) {
            let next = (i + 1) % 5;
            
            // Calculate normal for this side face
            let v1 = [front[next][0] - front[i][0], front[next][1] - front[i][1], front[next][2] - front[i][2]];
            let v2 = [back[i][0] - front[i][0], back[i][1] - front[i][1], back[i][2] - front[i][2]];

            // calculate normals for each side face
            let normal = [
                v1[1] * v2[2] - v1[2] * v2[1],
                v1[2] * v2[0] - v1[0] * v2[2],
                v1[0] * v2[1] - v1[1] * v2[0]
            ];
            
            // Normalize the normal vector by dividing it by its length
            let length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal = [normal[0] / length, normal[1] / length, normal[2] / length];

            drawTriangle3DUVNormal(
                [front[i][0], front[i][1], front[i][2],
                 front[next][0], front[next][1], front[next][2],
                 back[i][0], back[i][1], back[i][2]],
                [0, 0, 1, 1, 1, 0, 1, 0, 0],
                [normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]]
            );
            drawTriangle3DUVNormal(
                [front[next][0], front[next][1], front[next][2],
                 back[next][0], back[next][1], back[next][2],
                 back[i][0], back[i][1], back[i][2]],
                [0, 0, 1, 1, 1, 0, 1, 0, 0],
                [normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]]
            );
        }
    }
}
