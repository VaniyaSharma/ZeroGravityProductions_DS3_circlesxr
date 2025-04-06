AFRAME.registerComponent('orb-placement-checker', {
    schema: {
      expectedOrbId: { type: 'string' }
    },
  
    init: function () {
      this.correctlyPlaced = false;
  
      const expectedOrb = document.getElementById(this.data.expectedOrbId);
      if (!expectedOrb) {
        console.warn(`Expected orb '${this.data.expectedOrbId}' not found.`);
        return;
      }
  
      // Assume correct placement if orb emits positionLocked
      expectedOrb.addEventListener('positionLocked', () => {
        this.correctlyPlaced = true;
        console.log(`${this.data.expectedOrbId} marked as correctly placed in socket ${this.el.id}`);
      });
  
      expectedOrb.addEventListener('positionUnlocked', () => {
        this.correctlyPlaced = false;
        console.log(`${this.data.expectedOrbId} marked as removed from socket ${this.el.id}`);
      });
    }
  });