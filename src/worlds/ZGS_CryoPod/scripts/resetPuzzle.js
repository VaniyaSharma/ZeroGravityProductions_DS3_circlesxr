AFRAME.registerComponent('reset-puzzle', {
  init: function () {
    this.orbIds = ['orb1', 'orb2', 'orb3'];
    this.originalPositions = {};

    // Store original positions when scene loads
    this.orbIds.forEach(id => {
      const orb = document.getElementById(id);
      if (orb) {
        this.originalPositions[id] = Object.assign({}, orb.getAttribute('position'));
        console.log(`Stored initial position of ${id}:`, this.originalPositions[id]);
      } else {
        console.warn(`Orb with ID '${id}' not found on init.`);
      }
    });

    // Listen for button click
    this.el.addEventListener('click', () => {
      console.log("Reset button was pressed!");

      this.orbIds.forEach(id => {
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