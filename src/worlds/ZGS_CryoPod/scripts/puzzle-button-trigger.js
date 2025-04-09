AFRAME.registerComponent('puzzle-button-trigger', {
    schema: {
        socketIds: { type: 'array' } // List of socket entity IDs
      },
    
      init: function () {
        this.el.addEventListener('click', () => {
          const socketIds = this.data.socketIds;
          const allPlaced = socketIds.every(id => {
            const socketEl = document.getElementById(id);
            if (!socketEl) {
              console.warn(`Socket ${id} not found.`);
              return false;
            }
            const checker = socketEl.components['orb-placement-checker'];
            return checker && checker.correctlyPlaced;
          });
    
          if (allPlaced) {
            console.log('Puzzle completed!');
            // Global event to trigger animation, next stage, audio, etc.
            this.el.emit('puzzleCompleted', {}, true);


          } 
          else {
            console.log('Puzzle incomplete.');
          }
        });
      }
    });