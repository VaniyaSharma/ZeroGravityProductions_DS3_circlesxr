AFRAME.registerComponent('reset-puzzle', {
  schema: {
    orbIds: { type: 'array' } // List of socket entity IDs
  },
  init: function () {
    this.originalPositions = {};
    this.puzzleIsComplete = false;
    const sceneEl = this.el.sceneEl;

    // Store original positions when scene loads
    sceneEl.addEventListener('loaded', () => {
      this.data.orbIds.forEach(id => {
        const orb = document.getElementById(id);
        if (orb) {
          const posAttr = orb.getAttribute('position');
          this.originalPositions[id] = { x: posAttr.x, y: posAttr.y, z: posAttr.z };
          console.log(`Stored initial position of ${id}:`, this.originalPositions[id]);
        } else {
          console.warn(`Orb with ID '${id}' not found on init.`);
        }
      });
    });

    // Listen for puzzle completion
    sceneEl.addEventListener('puzzleCompleted', () => {
      console.log('Puzzle completed — reset disabled.');
      this.puzzleIsComplete = true;
    });

    // Listen for button click
    this.el.addEventListener('click', () => {
      
      if (this.puzzleIsComplete) {
        console.log("Reset blocked — puzzle already completed.");
        return;
      }
      console.log("Reset button was pressed!");

      this.data.orbIds.forEach(id => {
        const orb = document.getElementById(id);
        const originalPos = this.originalPositions[id];

        if (orb && originalPos) {
          orb.setAttribute('position', originalPos);

          const locker = orb.components['position-locker'];
          if (locker) {
            locker.isLocked = false;
          }

          orb.emit('positionUnlocked', { position: originalPos });
          console.log(`${id} reset to original position:`, originalPos);
        } else {
          console.warn(`Couldn't reset orb '${id}' — missing orb or stored position.`);
        }
      });
    });
  }
});