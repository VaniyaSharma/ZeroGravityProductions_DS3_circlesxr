// This is the file that Ray messed with
AFRAME.registerComponent("position-locker", {
  schema: {
    target: { type: "vec3", default: { x: 0.0, y: 1.464, z: 1.153 } },
    threshold: { type: "number", default: 0.1 },
  },

  init: function () {
    const CONTEXT_AF = this;
    this.isLocked = false;
    CONTEXT_AF.getParams = function (url) {
      var params = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };
    const params = CONTEXT_AF.getParams(window.location.href);

    if (params.hasOwnProperty("hubState")) {
      if (params["hubState"] === "env") {
        changeEnvironmentInstant();
        console.log("Env change is on!");
        // CONTEXT_AF.setHubURL("env");
        // Doing it manually
        let url = new URL(window.location.href);
        url.searchParams.set("hubState", "env");
        history.replaceState(history.state, "", url.href);
      } else if (params["hubState"] === "house") {
        changeEnvironmentInstant();
        changeHouseInstant();
        console.log("House change is on!");
        // Doing it manually
        let url = new URL(window.location.href);
        url.searchParams.set("hubState", "house");
        history.replaceState(history.state, "", url.href);
      } else {
        console.log("Env/house change is off...");
      }
    }
  },
  tick: function () {
    const el = this.el;

    // Get the circles-object-world attribute
    const circlesObjectWorld = el.getAttribute("circles-object-world");

    if (circlesObjectWorld) {
      const targetPosition = new THREE.Vector3(
        this.data.target.x,
        this.data.target.y,
        this.data.target.z
      );
      const currentPosition = new THREE.Vector3();
      el.object3D.getWorldPosition(currentPosition);
      const distance = currentPosition.distanceTo(targetPosition);

      if (
        distance <= this.data.threshold &&
        !this.isLocked &&
        circlesObjectWorld.pickedup === false
      ) {
        // Lock position
        el.setAttribute("position", this.data.target);
        el.setAttribute("rotation", { x: 0, y: 0, z: 0 });

        // Emit custom event
        el.emit("positionLocked", { position: this.data.target });

        // Remove pickup-related attributes
        el.removeAttribute("circles-pickup-networked");
        el.removeAttribute("circles-pickup-object");

        // Mark as position locked
        this.isLocked = true;
        console.log("Position locked at target:", this.data.target);

        // Re-add pickup attributes after a short delay
        // setTimeout(() => {
        //   el.setAttribute("circles-pickup-networked");
        //   el.setAttribute("circles-pickup-object", "animate:false;");
        //   console.log("Pickup attributes re-added after lock.");
        // }, 1000); // Delay for a smoother effect
      } else if (distance > this.data.threshold && this.isLocked) {
        // Unlock position when out of range
        this.isLocked = false;
        el.emit("positionUnlocked", { position: currentPosition });
        console.log("Position unlocked. Can be locked again.");
      }
    }
    if (circlesObjectWorld.pickedup === true) {
      console.log("Seed is currently picked up");
    }
  },
});

let environmentBool = false;
let houseBool = false;

document.addEventListener("DOMContentLoaded", function () {
  const seed = document.querySelector("#seed");

  if (seed) {
    seed.addEventListener("positionLocked", function (event) {
      console.log("Seed locked at position:", event.detail.position);
      // seed.classList.remove("circles-interactive-object");
      // Logic goes here
      if (!environmentBool) {
        changeEnvironment();
        setHubURL("env");
      } else {
        console.log("Environment change already triggered");
        if (houseBool) console.log("House change already triggered");
        else {
          changeHouse();
          setHubURL("house");
        }
      }
    });

    seed.addEventListener("positionUnlocked", function (event) {
      console.log("Seed unlocked, current position:", event.detail.position);
      // Logic goes here
    });
  }
});

function changeEnvironment() {
  if (!environmentBool) {
    //Removing old environment
    oldEnvironment = document.querySelector("#oldEnv");
    console.log(oldEnvironment);
    oldEnvironment.setAttribute("environment", {
      groundTexture: "walkernoise",
      groundColor: "#F4A460",
      groundColor2: "#2E8B57",
    });

    console.log("Environment Function being called.");
    // Get the A-Frame scene
    const scene = document.querySelector("a-scene");
    if (!scene) {
      console.error("Scene not found!");
      return;
    }
    let newEnvironment = document.createElement("a-entity");
    newEnvironment.setAttribute("environment", {
      preset: "forest",
      groundColor: "#F4A460",
      skyType: "none",
      fog: "0.5",
      ground: "none",
      lighting: "none",
    });
    newEnvironment.setAttribute("position", "0 -13 0");
    scene.appendChild(newEnvironment);
    newEnvironment.setAttribute("animation", {
      property: "position",
      to: "0 0.12 0",
      dur: "2000",
      easing: "linear",
    });

    console.log("Environment changed successfully.");
    environmentBool = true;
  }
}

function changeEnvironmentInstant() {
  console.log("Setting up instant env change");
  if (!environmentBool) {
    //Removing old environment
    oldEnvironment = document.querySelector("#oldEnv");
    console.log(oldEnvironment);
    oldEnvironment.setAttribute("environment", {
      groundTexture: "walkernoise",
      groundColor: "#F4A460",
      groundColor2: "#2E8B57",
    });

    console.log("Environment Function being called.");
    // Get the A-Frame scene
    const scene = document.querySelector("a-scene");
    if (!scene) {
      console.error("Scene not found!");
      return;
    }
    let newEnvironment = document.createElement("a-entity");
    newEnvironment.setAttribute("environment", {
      preset: "forest",
      groundColor: "#F4A460",
      skyType: "none",
      fog: "0.5",
      ground: "none",
      lighting: "none",
    });
    newEnvironment.setAttribute("position", "0 -13 0");
    scene.appendChild(newEnvironment);
    newEnvironment.setAttribute("animation", {
      property: "position",
      to: "0 0.12 0",
      dur: "1",
      easing: "linear",
    });

    console.log("Inst Environment changed successfully.");
    environmentBool = true;
  }
}

function changeHouse() {
  console.log("House Function being called.");
  if (!houseBool) {
    // Put house animation here
    const scene = document.querySelector("a-scene");

    // Get the current (old) house model
    const oldHouse = document.querySelector("[gltf-model='#enviro-gltf']");
    if (!oldHouse) {
      console.error("Old house model not found!");
      return;
    }

    // Ensure old house is using transparent material
    oldHouse.setAttribute("material", "transparent: true; opacity: 1");

    // Create the new house and set initial opacity to 0
    const newHouse = document.createElement("a-entity");
    newHouse.setAttribute("id", "newHouse");
    newHouse.setAttribute("gltf-model", "#newenviron_glb");
    newHouse.setAttribute("position", "0.595 0.028 0.229");
    newHouse.setAttribute("scale", "1 1 1");
    newHouse.setAttribute("shadow", "receive: true; cast: true");
    newHouse.setAttribute("material", "transparent: true; opacity: 0");
    scene.appendChild(newHouse);

    // Fade out the old house
    oldHouse.setAttribute("animation__fadeout", {
      property: "material.opacity",
      to: 0,
      dur: 1500,
      easing: "easeInOutQuad"
    });

    // Fade in the new house
    newHouse.setAttribute("animation__fadein", {
      property: "material.opacity",
      to: 1,
      dur: 1500,
      easing: "easeInOutQuad"
    });

    // Delete the old house after fade out is done
    setTimeout(() => {
      if (oldHouse.parentNode) {
        oldHouse.parentNode.removeChild(oldHouse);
        console.log("Old house removed from scene.");
      }
    }, 1600); // slightly longer than animation duration
    houseBool = true;
  }
}

function changeHouseInstant() {
  console.log("Inst House Function being called.");
  if (!houseBool) {
    // Put house animation here

    const scene = document.querySelector("a-scene");
    // Get the current (old) house model
    const oldHouse = document.querySelector("[gltf-model='#enviro-gltf']");
    if (!oldHouse) {
      console.error("Old house model not found!");
      return;
    }

    // Create the new house
    const newHouse = document.createElement("a-entity");
    newHouse.setAttribute("id", "newHouse");
    newHouse.setAttribute("gltf-model", "#newenviron_glb");
    newHouse.setAttribute("position", "0.595 0.028 0.229");
    newHouse.setAttribute("scale", "1 1 1");
    newHouse.setAttribute("shadow", "receive: true; cast: true");
    scene.appendChild(newHouse);

    // Delete the old house after fade out is done
    if (oldHouse.parentNode) {
      oldHouse.parentNode.removeChild(oldHouse);
      console.log("Old house removed from scene.");
    }
    houseBool = true;
  }
}

function setHubURL(hubID) {
  // const CONTEXT_AF = this;
  console.log("setting hub id to", hubID);

  //add this property to allow the seed to still be in hand when coming back
  let url = new URL(window.location.href);
  url.searchParams.set("hubState", hubID);
  history.replaceState(history.state, "", url.href);
}
