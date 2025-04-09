AFRAME.registerComponent('position-locker', {
  schema: {
    target: {type: 'vec3', default: {x: 0.0, y: 1.464, z: 1.153}},
    threshold: {type: 'number', default: 0.1}
  },
  init: function () {
    this.isLocked = false;
    this.regularBowl = document.querySelector('#bowl');  // Regular bowl (inactive model)
    this.glowingBowl = document.querySelector('#bowl-glow'); // Glowing bowl (active model)
    this.portal = document.querySelector('#link_hub');
  },
  tick: function () {
    const el = this.el;

    // Attempt to get the circles-object-world attribute
    const circlesObjectWorld = el.getAttribute('circles-object-world');

    if (!circlesObjectWorld) {
      console.warn(`[position-locker] 'circles-object-world' not found on element #${el.id}`);
      return;
    }

    const targetPosition = new THREE.Vector3(
      this.data.target.x, this.data.target.y, this.data.target.z
    );
    const currentPosition = new THREE.Vector3();
    el.object3D.getWorldPosition(currentPosition);
    const distance = currentPosition.distanceTo(targetPosition);

    // Log if orb is being picked up
    if (circlesObjectWorld.pickedup === true) {
      console.log(" Orb is currently picked up");
    }

    // Locking logic
    if (distance <= this.data.threshold && !this.isLocked && circlesObjectWorld.pickedup === false) {
      el.setAttribute('position', this.data.target);
      el.setAttribute('rotation', { x: 0, y: 0, z: 0 }); // ← this is the new line

      el.emit('positionLocked', { position: this.data.target });
      // Hide regular bowl and show glowing bowl
      if (this.regularBowl) {
        this.regularBowl.setAttribute('visible', false);
      }
      if (this.glowingBowl) {
        this.glowingBowl.setAttribute('visible', true);
      }
      if (this.portal) {
        this.portal.setAttribute('visible', true);
      }


      el.removeAttribute('circles-pickup-networked');
      el.removeAttribute('circles-pickup-object');

      this.isLocked = true;
      console.log("Orb position locked at target:", this.data.target);


      setTimeout(() => {
        el.setAttribute('circles-pickup-networked', '');
        el.setAttribute('circles-pickup-object', 'animate:false;');
        console.log(" Pickup attributes re-added to orb after lock.");
      }, 1000);
    } 
    // Unlocking logic
    else if (distance > this.data.threshold && this.isLocked) {
      this.isLocked = false;
      el.emit('positionUnlocked', { position: currentPosition });
      console.log(" Orb position unlocked.");
      // Hide glowing bowl and show regular bowl
      if (this.regularBowl) {
        this.regularBowl.setAttribute('visible', true);
      }
      if (this.glowingBowl) {
        this.glowingBowl.setAttribute('visible', false);
      }
      if (this.portal) {
        this.portal.setAttribute('visible', false);
      }
    }
  }
});

// Wait until everything is loaded
window.addEventListener('load', function () {
  const orb = document.querySelector('#orb');

  if (orb) {
    orb.addEventListener('positionLocked', function (event) {
      console.log(' Orb locked at position:', event.detail.position);
      // Additional logic here if needed
    });

    orb.addEventListener('positionUnlocked', function (event) {
      console.log(' Orb unlocked from position:', event.detail.position);
      // Additional logic here if needed
    });
  } else {
    console.warn("No element with ID '#orb' found.");
  }
});
