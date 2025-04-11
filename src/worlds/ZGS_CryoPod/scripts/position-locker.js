AFRAME.registerComponent('position-locker', {
    schema: {
      threshold: {type: 'number', default: 0.1}
    },
    init: function () {
      this.isLocked = false;  
      this.colliderEl = null;
      this.colliders = [];

      //Find the collider object
      const scene = this.el.sceneEl;
      this.colliders = Array.from(scene.querySelectorAll('[collider]'));

      if (this.colliders.length === 0) {
        console.warn("No objects with 'collider' attribute found in the scene.");
      }
    },
    tick: function () {
      const el = this.el;

      // Get the circles-object-world attribute
      const circlesObjectWorld = el.getAttribute('circles-object-world');

      if (!circlesObjectWorld || this.colliders.length === 0) return;

      const currentPosition = new THREE.Vector3();
      el.object3D.getWorldPosition(currentPosition);

      // Find the closest collider within threshold
      let closest = null;
      let minDistance = Infinity;

      this.colliders.forEach(collider => {
        const colliderPos = new THREE.Vector3();
        collider.object3D.getWorldPosition(colliderPos);

        const distance = currentPosition.distanceTo(colliderPos);
        if (distance < minDistance) {
          minDistance = distance;
          closest = { el: collider, distance: distance, position: colliderPos };
        }
      });

      if (!closest) return;

      if (closest.distance <= this.data.threshold && !this.isLocked && circlesObjectWorld.pickedup === false) {
        // Lock position
        el.setAttribute('position', closest.position);
        el.setAttribute('rotation', { x: 0, y: 0, z: 0 });

        // Emit custom event
        el.emit('positionLocked', { position: closest.position });

        // Remove pickup-related attributes
        el.removeAttribute('circles-pickup-networked');
        el.removeAttribute('circles-pickup-object');

        // Mark as position locked
        this.isLocked = true;
        this.closestCollider = closest.el;
        console.log("Position locked at target:", closest.position);

        // Re-add pickup attributes after delay
        setTimeout(() => {
          el.setAttribute('circles-pickup-networked');
          el.setAttribute('circles-pickup-object', 'animate:false;');
          console.log("Pickup attributes re-added after lock.");
        }, 1000);
      } else if (this.isLocked) {
        // Check distance to locked collider
        const lockedPos = new THREE.Vector3();
        this.closestCollider?.object3D.getWorldPosition(lockedPos);
        const distanceToLocked = currentPosition.distanceTo(lockedPos);

        if (distanceToLocked > this.data.threshold) {
          this.isLocked = false;
          el.emit('positionUnlocked', { position: currentPosition });
          console.log("Position unlocked. Can be locked again.");
        }
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

AFRAME.registerComponent('collider', {
  init: function () {
    console.log(`Collider initialized on`, this.el);
  }
});