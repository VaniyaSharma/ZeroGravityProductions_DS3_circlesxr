AFRAME.registerComponent('circles-navmesh-boundary-check', {
    init: function () {
      var self = this;
      // Wait until the global CIRCLES variable is defined.
      function waitForCircles() {
        if (typeof CIRCLES === 'undefined') {
          console.warn('CIRCLES not defined yet, waiting...');
          setTimeout(waitForCircles, 100);
          return;
        }
        // Once CIRCLES exists, check if it’s ready.
        if (!CIRCLES.isReady()) {
          document.addEventListener(CIRCLES.EVENTS.READY, function () {
            console.log("Circles is ready!");
            self.setup();
          });
        } else {
          self.setup();
        }
      }
      waitForCircles();
    },
    setup: function () {
      // Get the nav mesh element.
      const navmeshEl = document.querySelector('#navmesh');
      if (navmeshEl) {
        // Read the nav mesh's position.
        const navPos = navmeshEl.getAttribute('position') || { x: 0, y: 0, z: 0 };
        // Read the geometry data. (Make sure your nav mesh has proper width/depth defined.)
        const geometry = navmeshEl.getAttribute('geometry') || { width: 10, depth: 10 };
        // Read the scale.
        const scale = navmeshEl.getAttribute('scale') || { x: 1, y: 1, z: 1 };
  
        // For an a-plane rotated -90° about the X-axis:
        // local width maps to world X size, and local depth maps to world Z size.
        this.bounds = {
          minX: navPos.x - ((geometry.width || 10) * (scale.x || 1)) / 2,
          maxX: navPos.x + ((geometry.width || 10) * (scale.x || 1)) / 2,
          minZ: navPos.z - ((geometry.depth || 10) * (scale.z || 1)) / 2,
          maxZ: navPos.z + ((geometry.depth || 10) * (scale.z || 1)) / 2
        };
        console.log("Circles Navmesh boundaries:", this.bounds);
      } else {
        console.warn("Navmesh element (#navmesh) not found. Using default boundaries.");
        this.bounds = { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };
      }
    },
    tick: function () {
      if (!this.bounds) { return; }
      // Get the avatar rig element via Circles API.
      const rig = CIRCLES.getAvatarRigElement();
      if (!rig) { return; }
      
      // Retrieve the current position.
      const pos = rig.getAttribute('position');
      const b = this.bounds;
      // Clamp the x and z values.
      const clampedX = Math.max(b.minX, Math.min(b.maxX, pos.x));
      const clampedZ = Math.max(b.minZ, Math.min(b.maxZ, pos.z));
      
      // If the rig is out-of-bounds, reset its position.
      if (pos.x !== clampedX || pos.z !== clampedZ) {
        rig.setAttribute('position', { x: clampedX, y: pos.y, z: clampedZ });
      }
    }
  });
  