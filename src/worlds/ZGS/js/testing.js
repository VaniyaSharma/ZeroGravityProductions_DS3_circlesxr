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
      const seed = document.querySelector("#seed");
      seed.emit("positionLocked", {
        message: "Seed position has been locked!",
      });
      console.log("Position Locked event emitted.");
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
    });
  },
});
