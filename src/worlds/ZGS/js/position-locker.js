AFRAME.registerComponent('position-locker', {
    schema: {
      target: {type: 'vec3', default: {x: 0.0, y: 1.464, z: 1.153}},
      threshold: {type: 'number', default: 0.1}
    },
    init: function () {
      this.isLocked = false;
    },
    tick: function () {
      const el = this.el;

      // Get the circles-object-world attribute
      const circlesObjectWorld = el.getAttribute('circles-object-world');

      if (circlesObjectWorld) {    
        const targetPosition = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z);
        const currentPosition = new THREE.Vector3();
        el.object3D.getWorldPosition(currentPosition);
        const distance = currentPosition.distanceTo(targetPosition);

        if (distance <= this.data.threshold && !this.isLocked && circlesObjectWorld.pickedup === false) {
          // Lock position
          el.setAttribute('position', this.data.target);

          // Emit custom event
          el.emit('positionLocked', { position: this.data.target });

          // Remove pickup-related attributes
          el.removeAttribute('circles-pickup-networked');
          el.removeAttribute('circles-pickup-object');

          // Mark as position locked
          this.isLocked = true;
          console.log("Position locked at target:", this.data.target);

          // Re-add pickup attributes after a short delay
          setTimeout(() => {
            el.setAttribute('circles-pickup-networked');
            el.setAttribute('circles-pickup-object', 'animate:false;');
            console.log("Pickup attributes re-added after lock.");
          }, 1000); // Delay for a smoother effect
        } 
        else if (distance > this.data.threshold && this.isLocked) {
        // Unlock position when out of range
        this.isLocked = false;
        el.emit('positionUnlocked', { position: currentPosition });
        console.log("Position unlocked. Can be locked again.");
        }
      }
      if (circlesObjectWorld.pickedup === true) {
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

      seed.addEventListener('positionUnlocked', function (event) {
        console.log('Seed unlocked, current position:', event.detail.position);
        // Logic goes here
      });
    }
  });