let instant = false;
AFRAME.registerComponent("puzzle-button-trigger", {
  schema: {
    socketIds: { type: "array" }, // List of socket entity IDs
  },

  init: function () {
    checkCryoState();
    if (instant) {
      console.log("triggering instant animation");

      // Global event to trigger stuff
      this.el.emit("puzzleCompleted", {}, true);

      const podGlass = document.getElementById("podglass");
      const personPre = document.getElementById("personpre");

      // 1. Fog up the glass (increase opacity and color to white)
      podGlass.setAttribute("animation__fogin_opcaity", {
        property: "material.opacity",
        to: 1,
        dur: 1,
        easing: "easeInOutQuad",
      });
      podGlass.setAttribute("animation__fogin_color", {
        property: "material.color",
        to: "#FFFFFF",
        dur: 1,
        easing: "easeInOutQuad",
      });
      podGlass.setAttribute("animation__fogin_metal", {
        property: "material.metalness",
        to: 0,
        dur: 1,
        easing: "easeInOutQuad",
      });

      // 2. Swap model after 1 second
      personPre.setAttribute("gltf-model", "#personpost_glb");

      // 3. Restore color and opacity after 2 seconds
      podGlass.setAttribute("animation__fogout_opacity", {
        property: "material.opacity",
        to: 0.62,
        dur: 1,
        easing: "easeInOutQuad",
      });

      podGlass.setAttribute("animation__fogout_color", {
        property: "material.color",
        to: "#D9EBFF", // Replace with original color
        dur: 1,
        easing: "easeInOutQuad",
      });

      podGlass.setAttribute("animation__fogout_metal", {
        property: "material.metalness",
        to: 0.9,
        dur: 1,
        easing: "easeInOutQuad",
      });

      // Raise the seed pedestal
      const seed = document.getElementById("seed");
      const seedHolder = document.getElementById("seedHolder");

      if (seedHolder) {
        seedHolder.setAttribute("animation__raise", {
          property: "position",
          to: `2.653 0.1 -0.283`,
          dur: 1,
          easing: "easeOutCubic",
        });
      }

      const paramsX = getParams(window.location.href);

      if (
        paramsX.hasOwnProperty("cryoState") &&
        paramsX["cryoState"] === "seed"
      ) {
        seed.setAttribute("animation__raise", {
          property: "position",
          to: `2.480 0.980 -0.320`,
          dur: 1,
          easing: "easeOutCubic",
        });
      }

      console.log("Seed pedestal is rising.");
    } else {
      this.el.addEventListener("click", () => {
        const socketIds = this.data.socketIds;
        let allPlaced = true;

        console.log("Checking the following socket IDs:", socketIds);
        socketIds.forEach((id) => {
          const socketEl = document.getElementById(id);

          if (!socketEl) {
            console.warn(`Socket ${id} not found.`);
            allPlaced = false;
            return;
          }

          const checker = socketEl.components["orb-placement-checker"];
          if (!checker) {
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
          console.log("Puzzle completed!");
          // Global event to trigger stuff
          this.el.emit("puzzleCompleted", {}, true);

          const podGlass = document.getElementById("podglass");
          const personPre = document.getElementById("personpre");

          // 1. Fog up the glass (increase opacity and color to white)
          podGlass.setAttribute("animation__fogin_opcaity", {
            property: "material.opacity",
            to: 1,
            dur: 1000,
            easing: "easeInOutQuad",
          });
          podGlass.setAttribute("animation__fogin_color", {
            property: "material.color",
            to: "#FFFFFF",
            dur: 1000,
            easing: "easeInOutQuad",
          });
          podGlass.setAttribute("animation__fogin_metal", {
            property: "material.metalness",
            to: 0,
            dur: 1000,
            easing: "easeInOutQuad",
          });

          // 2. Swap model after 1 second
          setTimeout(() => {
            personPre.setAttribute("gltf-model", "#personpost_glb");
          }, 1000);

          // 3. Restore color and opacity after 2 seconds
          setTimeout(() => {
            podGlass.setAttribute("animation__fogout_opacity", {
              property: "material.opacity",
              to: 0.62,
              dur: 1000,
              easing: "easeInOutQuad",
            });

            podGlass.setAttribute("animation__fogout_color", {
              property: "material.color",
              to: "#D9EBFF", // Replace with original color
              dur: 1000,
              easing: "easeInOutQuad",
            });

            podGlass.setAttribute("animation__fogout_metal", {
              property: "material.metalness",
              to: 0.9,
              dur: 1000,
              easing: "easeInOutQuad",
            });
          }, 2000);

          // Raise the seed pedestal
          setTimeout(() => {
            const seed = document.getElementById("seed");
            const seedHolder = document.getElementById("seedHolder");

            if (seedHolder) {
              seedHolder.setAttribute("animation__raise", {
                property: "position",
                to: `2.653 0.1 -0.283`,
                dur: 1000,
                easing: "easeOutCubic",
              });
            }

            if (seed) {
              seed.setAttribute("animation__raise", {
                property: "position",
                to: `2.480 0.980 -0.320`,
                dur: 1000,
                easing: "easeOutCubic",
              });
            }

            console.log("Seed pedestal is rising.");
          }, 3000); // Delay this to occur after glass animations

          //set URL

          const CONTEXT_AF = this;

          //add this property to allow the seed to still be in hand when coming back
          let url = new URL(window.location.href);
          url.searchParams.set("cryoState", "seed");
          history.replaceState(history.state, "", url.href);

          seed.addEventListener("click", function () {
            url.searchParams.set("cryoState", "done");
            history.replaceState(history.state, "", url.href);
          });
        } else {
          console.log("Puzzle incomplete.");
        }
      });
    }
  },
});

function checkCryoState() {
  getParams = function (url) {
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
  const params = getParams(window.location.href);

  if (params.hasOwnProperty("cryoState")) {
    if (params["cryoState"] === "done" || params["cryoState"] === "seed") {
      instant = true;

      console.log("Cryo change is on!");
    } else {
      console.log("Cryo change is off...");
    }
  }
}
