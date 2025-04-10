AFRAME.registerComponent('position-locker', {
    schema: {
      target: {type: 'vec3', default: {x: 0.0, y: 1.464, z: 1.153}},
      threshold: {type: 'number', default: 0.1}
    },
    init: function () {
      this.isLocked = false;
    },
    tick: function () {
      const el = this.el;

      // Get the circles-object-world attribute
      const circlesObjectWorld = el.getAttribute('circles-object-world');

      if (circlesObjectWorld) {    
        const targetPosition = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z);
        const currentPosition = new THREE.Vector3();
        el.object3D.getWorldPosition(currentPosition);
        const distance = currentPosition.distanceTo(targetPosition);

        if (distance <= this.data.threshold && !this.isLocked && circlesObjectWorld.pickedup === false) {
          // Lock position
          el.setAttribute('position', this.data.target);
          el.setAttribute('rotation', { x: 0, y: 0, z: 0});

          // Emit custom event
          el.emit('positionLocked', { position: this.data.target });

          // Remove pickup-related attributes
          el.removeAttribute('circles-pickup-networked');
          el.removeAttribute('circles-pickup-object');

          // Mark as position locked
          this.isLocked = true;
          console.log("Position locked at target:", this.data.target);

          // Re-add pickup attributes after a short delay
          setTimeout(() => {
            el.setAttribute('circles-pickup-networked');
            el.setAttribute('circles-pickup-object', 'animate:false;');
            console.log("Pickup attributes re-added after lock.");
          }, 1000); // Delay for a smoother effect
        } 
        else if (distance > this.data.threshold && this.isLocked) {
        // Unlock position when out of range
        this.isLocked = false;
        el.emit('positionUnlocked', { position: currentPosition });
        console.log("Position unlocked. Can be locked again.");
        }
      }
      if (circlesObjectWorld.pickedup === true) {
        console.log("Seed is currently picked up");
      }
    }
  });

  let environmentBool = false;
  let houseBool       = false;

  document.addEventListener('DOMContentLoaded', function () {
    const seed = document.querySelector('#seed');
  
    if (seed) {
      seed.addEventListener('positionLocked', function (event) {
        console.log('Seed locked at position:', event.detail.position);
        // Logic goes here
        if (!environmentBool)
          changeEnvironment();
        else {
          console.log('Environment change already triggered')
          if (houseBool)
            console.log('House change already triggered')
          else
            changeHouse();
        }
      });

      seed.addEventListener('positionUnlocked', function (event) {
        console.log('Seed unlocked, current position:', event.detail.position);
        // Logic goes here
      });
    }
  });

  function changeEnvironment() {
    if (!environmentBool)
    {
      //Removing old environment
      oldEnvironment = document.querySelector("#oldEnv");
      console.log(oldEnvironment);
      oldEnvironment.setAttribute("environment", {
        groundTexture: 'walkernoise',
        groundColor: '#F4A460',
        groundColor2: '#2E8B57',
      });

    console.log("Environment Function being called.");
      // Get the A-Frame scene
      const scene = document.querySelector('a-scene');
      if (!scene) {
        console.error("Scene not found!");
        return;
      }
    let newEnvironment = document.createElement('a-entity');
    newEnvironment.setAttribute('environment', {
      preset: 'forest', 
      groundColor:'#F4A460',
      skyType: 'none', 
      fog: '0.5',
      ground: 'none',
      lighting: 'none' 
      });
    newEnvironment.setAttribute('position', '0 -13 0');
    scene.appendChild(newEnvironment);
    newEnvironment.setAttribute('animation', {
      property: 'position',
      to: '0 0.12 0', 
      dur: '2000',
      easing: 'linear'
      });
  
      console.log("Environment changed successfully.");
      environmentBool = true;
    }
  }

  function changeHouse() {
    console.log("House Function being called.");
    if (!houseBool)
    {
      // Put house animation here

      houseBool = true;
    }
  }