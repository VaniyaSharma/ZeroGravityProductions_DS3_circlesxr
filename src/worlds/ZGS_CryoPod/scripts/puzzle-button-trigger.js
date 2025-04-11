AFRAME.registerComponent('puzzle-button-trigger', {
    schema: {
        socketIds: { type: 'array' } // List of socket entity IDs
      },
    
      init: function () {
        this.el.addEventListener('click', () => {
          const socketIds = this.data.socketIds;
          let allPlaced = true;

          console.log('Checking the following socket IDs:', socketIds);
          socketIds.forEach(id => {
            const socketEl = document.getElementById(id);

            if (!socketEl) {
              console.warn(`Socket ${id} not found.`);
              allPlaced = false;
              return  ;
            }

            const checker = socketEl.components['orb-placement-checker'];
            if(!checker) {
              console.warn(`Orb-placement-checker not found on '${id}'.`);
              allPlaced = false;
              return;
            }
            
            const isCorrect = checker.isCorrectlyPlaced();
            console.log(`Socket '${id}': correctlyPlaced = ${isCorrect}`);
            if (!isCorrect) {
              allPlaced = false;
            }
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