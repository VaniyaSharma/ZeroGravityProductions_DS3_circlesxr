AFRAME.registerComponent('orb-placement-checker', {
  schema: {
    expectedOrbId: { type: 'string' }  // ID of the orb expected in this socket
  },

  init: function () {
    this.orbPlaced = null;

    this.el.addEventListener('positionLocked', (evt) => {
      const placedOrb = evt.target;
      const placedOrbId = placedOrb.getAttribute('id');

      console.log(`Orb with ID '${placedOrbId}' placed in socket expecting '${this.data.expectedOrbId}'`);

      if (placedOrbId === this.data.expectedOrbId) {
        this.orbPlaced = placedOrbId;
        console.log(`Correct orb placed in ${this.el.id}`);
        // Something to indicate its correct

      } else {
        console.log(`Incorrect orb. Expected '${this.data.expectedOrbId}' but got '${placedOrbId}'`);
        // Something to indicate its wrong
      }
    });

    this.el.addEventListener('positionUnlocked', () => {
      this.orbPlaced = null;
      console.log(`Orb removed from ${this.el.id}`);
      // Something to probably indicate that there is nothing on it.
    });
  },

  isCorrectlyPlaced: function () {
    return this.orbPlaced === this.data.expectedOrbId;
  }
});