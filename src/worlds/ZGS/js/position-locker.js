AFRAME.registerComponent('position-locker', {
    schema: {
      target: {type: 'vec3', default: {x: 0.0, y: 1.464, z: 1.153}},
      threshold: {type: 'number', default: 0.1}
    },
    tick: function () {
      const el = this.el;
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