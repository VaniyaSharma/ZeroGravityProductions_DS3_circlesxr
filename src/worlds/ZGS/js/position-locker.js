AFRAME.registerComponent('position-locker', {
    schema: {
      threshold: {type: 'number', default: 0.1}
    },
    init: function () {
      this.isLocked = false;
      this.colliderEl = null;

      //Find the collider object
      const scene = this.el.sceneEl;
      this.colliderEl = scene.querySelector('[collider]');

      if (!this.colliderEl) {
        console.warn("No object with 'collider' attribute found in the scene.");
      }
    },
    tick: function () {
      const el = this.el;

      // Get the circles-object-world attribute
      const circlesObjectWorld = el.getAttribute('circles-object-world');

      if (circlesObjectWorld) {    

        if (!this.colliderEl) return; // Exit if no collider is found

        const targetPosition = new THREE.Vector3();
        this.colliderEl.object3D.getWorldPosition(targetPosition);

        const currentPosition = new THREE.Vector3();
        el.object3D.getWorldPosition(currentPosition);

        const distance = currentPosition.distanceTo(targetPosition);

        if (distance <= this.data.threshold && !this.isLocked && circlesObjectWorld.pickedup === false) {
          // Lock position
          el.setAttribute('position', targetPosition);

          // Emit custom event
          el.emit('positionLocked', { position: targetPosition });

          // Remove pickup-related attributes
          el.removeAttribute('circles-pickup-networked');
          el.removeAttribute('circles-pickup-object');

          // Mark as position locked
          this.isLocked = true;
          console.log("Position locked at target:", targetPosition);

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