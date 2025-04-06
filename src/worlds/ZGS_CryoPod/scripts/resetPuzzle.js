AFRAME.registerComponent('reset-puzzle', {
    init: function () {
        // Get the button and listen for its click event
        const resetButton = this.el;
        // Listen for the button press event
        resetButton.addEventListener('click', this.resetPuzzle.bind(this));
    },
  
    resetPuzzle: function () {
      // Get all orbs
      const orb1 = document.querySelector('#orb1');
      const orb2 = document.querySelector('#orb2');
      const orb3 = document.querySelector('#orb3');
  
      // Get their original positions from the HTML position attributes
      const originalPositions = {
        orb1: orb1.getAttribute('position'),
        orb2: orb2.getAttribute('position'),
        orb3: orb3.getAttribute('position')
      };
  
      // Function to reset an orb to its original position
      const resetOrb = (orb, originalPos) => {
        // Set orb position
        orb.setAttribute('position', originalPos);
        // Unlock its position if it was locked
        const positionLocker = orb.components['position-locker'];
        if (positionLocker && positionLocker.isLocked) {
          positionLocker.isLocked = false;
          orb.emit('positionUnlocked', { position: originalPos });
          console.log(`${orb.id} unlocked and reset.`);
        }
      };
  
      // Reset all orbs
      resetOrb(orb1, originalPositions.orb1);
      resetOrb(orb2, originalPositions.orb2);
      resetOrb(orb3, originalPositions.orb3);
  
      console.log("Puzzle reset to original positions.");
    }
  });