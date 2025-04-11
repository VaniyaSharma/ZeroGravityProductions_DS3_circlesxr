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
            
            const isCorrect = checker.correctlyPlaced;
            console.log(`Socket '${id}': correctlyPlaced = ${isCorrect}`);
            if (!isCorrect) {
              allPlaced = false;
            }
          }); 
    
          if (allPlaced) {
            console.log('Puzzle completed!');
            // Global event to trigger stuff
            this.el.emit('puzzleCompleted', {}, true);
            
            const podGlass = document.getElementById('podglass');
            const personPre = document.getElementById('personpre');

            // 1. Fog up the glass (increase opacity and color to white)
            podGlass.setAttribute('animation__fogin_opcaity', {
              property: 'material.opacity',
              to: 1,
              dur: 1000,
              easing: 'easeInOutQuad'
            });
            podGlass.setAttribute('animation__fogin_color', {
              property: 'material.color',
              to: '#FFFFFF',
              dur: 1000,
              easing: 'easeInOutQuad'
            });
            podGlass.setAttribute('animation__fogin_metal', {
              property: 'material.metalness',
              to: 0,
              dur: 1000,
              easing: 'easeInOutQuad'
            });

            // 2. Swap model after 1 second
            setTimeout(() => {
              personPre.setAttribute('gltf-model', '#personpost_glb');
            }, 1000);

            // 3. Restore color and opacity after 2 seconds
        setTimeout(() => {
          podGlass.setAttribute('animation__fogout_opacity', {
            property: 'material.opacity',
            to: 0.62,
            dur: 1000,
            easing: 'easeInOutQuad'
          });

          podGlass.setAttribute('animation__fogout_color', {
            property: 'material.color',
            to: '#D9EBFF', // Replace with original color
            dur: 1000,
            easing: 'easeInOutQuad'
          });

          podGlass.setAttribute('animation__fogout_metal', {
            property: 'material.metalness',
            to: 0.9,
            dur: 1000,
            easing: 'easeInOutQuad'
          });
        }, 2000);

        // Raise the seed pedestal
        setTimeout(() => {
          const seed = document.getElementById('seed');
          const seedHolder = document.getElementById('seedHolder');

          if (seedHolder) {
            seedHolder.setAttribute('animation__raise', {
              property: 'position',
              to: `2.653 0.1 -0.283`,
              dur: 1000,
              easing: 'easeOutCubic'
            });
          }

          if (seed) {
            seed.setAttribute('animation__raise', {
              property: 'position',
              to: `2.480 0.980 -0.320`,
              dur: 1000,
              easing: 'easeOutCubic'
            });
          }

          console.log('Seed pedestal is rising.');
        }, 3000); // Delay this to occur after glass animations
      } 
      else {
        console.log('Puzzle incomplete.');
      }
    });
  }
});