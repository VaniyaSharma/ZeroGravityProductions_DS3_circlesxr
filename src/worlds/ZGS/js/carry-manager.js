// /add-all-test-data
// In any scene you want this to work, add an empty item with the script:
// "<a-entity id="GameManager" carry-manager></a-entity>"
// TODO - implementation of carrying the seed
// Anthony's recommendation for stopgap - set the portal &carry value manually for now.
AFRAME.registerComponent("carry-manager", {
  schema: {},
  init() {
    console.log("Carry script init");

    const CONTEXT_AF = this;
    const urlParams = new URLSearchParams(window.location.search);

    //ripped from Anthony's source code! thanks tony <3
    //source: https://gomakethings.com/getting-all-query-string-values-from-a-url-with-vanilla-js/
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

    if (params.hasOwnProperty("carry")) {
      if (params["carry"] === "on") {
        //DO SEED STUFF HERE :)
        console.log("Carry component is on!");
      } else if (params["carry"] === "seedA") {
        console.log("Carry component is: " + params["carry"]);
      } else if (params["carry"] === "seedB") {
        console.log("Carry component is: " + params["carry"]);
      } else if (params["carry"] === "seedC") {
        console.log("Carry component is: " + params["carry"]);
      } else {
        console.log("Carry component is off. :(");
      }
    }

    //Make sure we take the carry param out when we put down the seed
    // CONTEXT_AF.addEventListener("putDownSeed", function () {
    //   //TODO - Change this to be attached to the pond? Or player?
    //   // Whichever fires the event of putting down the seed
    //   urlParams.set("carry", "off"); //Changes the param to be "carry=off" so we don't get the seed in the next level
    // });

    // Alternatively, from wardrobe html
    // const urlParams = new URLSearchParams(window.location.search);
    //       if (urlParams.has('carry')) {
    //         const portalElem = document.querySelector('#portal');
    //         const carryVal = urlParams.get('carry').split('/');  //get last bit of this array for the seed name
    //         //portalElem.setAttribute('circles-portal', {title_text:urlArr[urlArr.length-1], link_url:urlParams.get('last_route')})
    //         // DO SEED THING HERE
    //       }
  },
});

// Component to emit 'pickedup' event
AFRAME.registerComponent("emit-pickedup", {
  init: function () {
    const urlParams = new URLSearchParams(window.location.search);
    this.el.addEventListener("click", () => {
      const seed = document.querySelector("#seed");
      seed.emit("pickedup", { message: "Seed has been picked up!" });
      console.log("Picked Up event emitted.");
      urlParams.set("carry", "seedC");
      // replace current URL with newURL
      history.pushState({}, null, urlParams);
      // window.location.search = urlParams; //This one reloads the page :(
      console.log("Carry set to seedC!");
    });
  },
});

// Component to emit 'positionLocked' event
AFRAME.registerComponent("emit-positionlocked", {
  init: function () {
    const urlParams = new URLSearchParams(window.location.search);
    this.el.addEventListener("click", () => {
      const seed = document.querySelector("#seed");
      seed.emit("positionLocked", {
        message: "Seed position has been locked!",
      });
      console.log("Position Locked event emitted.");
      urlParams.set("carry", "off");
      // replace current URL with newURL
      history.pushState({}, null, urlParams);
      // window.location.search = urlParams; //This one reloads the page :(
      console.log("Carry set to off!");

      changeEnvironment();
    });
  },
});

//Only for Beta, Remove if needed
let environmentChanged = false; // Flag to track function execution

function changeEnvironment() {
  if (environmentChanged) {
    console.log("changeEnvironment has already been executed.");
    return; // Exit the function if it has already been executed
  }

  environmentChanged = true; // Set the flag to true upon first execution

  console.log("changeEnvironment function called."); // Debugging log

  // Get the A-Frame scene
  const scene = document.querySelector("a-scene");
  if (!scene) {
    console.error("Scene not found!");
    return;
  }

  // Create a new environment entity with desired attributes
  let newEnvironment = document.createElement("a-entity");
  newEnvironment.setAttribute("environment", {
    preset: "forest",
    groundColor: "#F4A460",
    skyType: "none",
    skyColor: "#87CEEB",
    horizonColor: "#FFD27F",
    fog: 0.5,
    groundTexture: "walkernoise",
    groundColor2: "#2E8B57",
    grid: "none",
  });

  // Set initial position off-screen
  newEnvironment.setAttribute("position", "0 -13 0");

  // Append to scene
  scene.appendChild(newEnvironment);

  // Animate position to bring it into view
  newEnvironment.setAttribute("animation", {
    property: "position",
    to: "0 0.12 0",
    dur: 2000,
    easing: "linear",
  });

  console.log("Environment changed successfully.");
}
