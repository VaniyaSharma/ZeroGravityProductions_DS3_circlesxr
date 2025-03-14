// Component to emit 'pickedup' event
AFRAME.registerComponent("emit-pickedup", {
  init: function () {
    this.el.addEventListener("click", () => {
      const seed = document.querySelector("#seed");
      seed.emit("pickedup", { message: "Seed has been picked up!" });
      console.log("Picked Up event emitted.");
    });
  },
});

// Component to emit 'positionLocked' event
AFRAME.registerComponent("emit-positionlocked", {
  init: function () {
    this.el.addEventListener("click", () => {
      
      changeEnvironment();

      const seed = document.querySelector("#seed");
      seed.emit("positionLocked", {
        message: "Seed position has been locked!",
      });
      console.log("Position Locked event emitted.");
      console.log("Testing Update")
    });
  },
});

// Component to handle 'pickedup' and 'positionLocked' events
AFRAME.registerComponent("handle-seed-events", {
  init: function () {
    this.el.addEventListener("pickedup", function (event) {
      console.log(event.detail.message);
    });

    this.el.addEventListener("positionLocked", function (event) {
      console.log(event.detail.message);
      changeEnvironment();
    });
  },
});

function changeEnvironment() {
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
    groundTexture: 'walkernoise',
    groundColor2: '#2E8B57',
    grid: 'none'
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
}