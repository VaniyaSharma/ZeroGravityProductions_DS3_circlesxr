// Created as per example provided by A-Frame: https://aframe.io/docs/1.7.0/components/geometry.html#register-a-custom-geometry
AFRAME.registerGeometry('cryoGlass', {
    schema: {
      // Define vertices as string-based vec3 points, in clockwise order
      vertices: {
        default: [
          '-1 -1 0',  // Bottom left
          '1 -1 0',   // Bottom right
          '0.7 1 0',  // Top right (narrower)
          '-0.7 1 0'  // Top left (narrower)
        ]
      }
    },
  
    init: function (data) {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
  
      // Convert each vertex string into THREE.Vector3
      data.vertices.forEach(vertex => {
        const point = vertex.split(' ').map(Number);
        vertices.push(new THREE.Vector3(point[0], point[1], point[2]));
      });
  
      // Define face indices to form two triangles
      const indices = [0, 1, 2, 2, 3, 0];
  
      // Convert vertices to Float32Array
      const positions = new Float32Array(vertices.length * 3);
      vertices.forEach((v, i) => {
        positions[i * 3] = v.x;
        positions[i * 3 + 1] = v.y;
        positions[i * 3 + 2] = v.z;
      });
  
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      geometry.computeBoundingBox();
  
      this.geometry = geometry;
    }
  });