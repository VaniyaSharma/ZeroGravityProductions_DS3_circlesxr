// /add-all-test-data
// In any scene you want this to work, add an empty item with the script:
// "<a-entity id="GameManager" carry-manager></a-entity>"
// Update: now the URL passing works. But...
// TODO - implementation of carrying the seed automagically on load when carry=on or seedA, seedB etc
// TODO - picking up seed makes carry=on, dropping it makers carry=off, etc...
// TODO - make sure one character carries the seed at a time

AFRAME.registerComponent("carry-manager", {
  schema: {},
  init() {
    console.log("Cryo carry script init");

    const CONTEXT_AF = this;

    const scene = document.querySelector("a-scene");

    //get seed
    CONTEXT_AF.seed = scene.querySelector("#seed");

    // CONTEXT_AF.seed.addEventListener("click", console.log("SEED CLICK")); //WHY ISN'T IT WORKING?

    // CONTEXT_AF.el.sceneEl.addEventListener(CIRCLES.EVENTS.WS_CONNECTED, wsReadyFunc);

    // For picking up in cryopod experience - event listener for clicking the seed, or using the following event from circles-pickup-object
    // CONTEXT_AF.el.emit(CIRCLES.EVENTS.PICKUP_THIS_OBJECT, {sendNetworkEvent:sendNetworkEvent}, true);

    // setTimeout(function () {
    //   CONTEXT_AF.seed.click();
    // }, 3000);

    const params_orig = new URLSearchParams(window.location.search);

    //ripped from Anthony's source code! thanks anthony <3

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
        CONTEXT_AF.setSeedURL(params["carry"]);
      } else if (
        params["carry"] === "seedA" ||
        params["carry"] === "seedB" ||
        params["carry"] === "seedC"
      ) {
        console.log("Carry component is: " + params["carry"]);
        // try on load event
        // if (CIRCLES.isCirclesWebsocketReady()) {
        //   CONTEXT_AF.seed.click()
        // }
        // CONTEXT_AF.el.sceneEl.addEventListener(
        //   CIRCLES.EVENTS.OBJECT_NETWORKED_ATTACHED,
        //   CONTEXT_AF.seed.click()
        // );

        // else
        setTimeout(function () {
          CONTEXT_AF.seed.click();
        }, 3000);
        CONTEXT_AF.setSeedURL(params["carry"]);
      } else if (params["carry"] === "test") {
        console.log("Carry component is: " + params["carry"]);
        CONTEXT_AF.setSeedURL("tested");
      } else {
        console.log("Carry component is off. :(");
        CONTEXT_AF.setSeedURL("off");
      }

      //event listener for picking up the seed.
      CONTEXT_AF.seed.addEventListener(
        CIRCLES.EVENTS.PICKUP_THIS_OBJECT,
        function () {
          console.log("Seed picked up!");
          CONTEXT_AF.setSeedURL("seedC");
        }
      );

      //event listener for releasing the seed.
      CONTEXT_AF.seed.addEventListener(
        CIRCLES.EVENTS.RELEASE_THIS_OBJECT,
        function () {
          console.log("Seed released!");
          CONTEXT_AF.setSeedURL("off");
        }
      );
    }
  },
  setSeedURL: function (seedID) {
    const CONTEXT_AF = this;

    // if (seedID=="") {
    // } else {
    // }
    // Seed pickup logic here?

    //add this property to allow the seed to still be in hand when coming back
    let url = new URL(window.location.href);
    url.searchParams.set("carry", seedID);
    history.replaceState(history.state, "", url.href);
  },
  // //add this property to allow the fire to still be on when coming back
  // let url = new URL(window.location.href);
  // url.searchParams.set('fire', (turnOn) ? 'on' : 'off');
  // history.replaceState(history.state, '', url.href);
});
