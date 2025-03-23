AFRAME.registerComponent('position-locker', {
    schema: {
      target: {type: 'vec3', default: {x: 0.0, y: 1.464, z: 1.153}},
      threshold: {type: 'number', default: 0.1}
    },
    tick: function () {
      const el = this.el;

      // Get the circles-object-world attribute
      const circlesObjectWorld = el.getAttribute('circles-object-world');

      if (circlesObjectWorld && circlesObjectWorld.pickedup === false) {
        const targetPosition = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z);
        
        const currentPosition = new THREE.Vector3();
        el.object3D.getWorldPosition(currentPosition);
    
        if (currentPosition.distanceTo(targetPosition) <= this.data.threshold) {
          // Lock position
          el.setAttribute('position', this.data.target);
          // Emit custom event
          el.emit('positionLocked', {position: this.data.target});
          // Optionally, remove this component to stop further checks
          el.removeAttribute('position-locker');
          el.removeAttribute('circles-pickup-networked');
          el.removeAttribute('circles-pickup-object');
        }
      }
      else if (circlesObjectWorld.pickedup === true) {
        console.log("Seed is currently picked up");
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const seed = document.querySelector('#seed');
  
    if (seed) {
      seed.addEventListener('positionLocked', function (event) {
        console.log('Seed locked at position:', event.detail.position);
        // Logic goes here
      });
    }
  });