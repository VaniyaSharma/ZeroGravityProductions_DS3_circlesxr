// /add-all-test-data
// In any scene you want this to work, add an empty item with the script:
// "<a-entity id="GameManager" carry-manager></a-entity>"
// TODO - implementation of carrying the seed
AFRAME.registerComponent("carry-manager", {
  schema: {},
  init() {
    console.log("Carry script init");

    const CONTEXT_AF = this;
    const params_orig = new URLSearchParams(window.location.search);

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

    // //Make sure we take the carry param out when we put down the seed
    // CONTEXT_AF.addEventListener("putDownSeed", function () {
    //   //TODO - Change this to be attached to the pond? Or player?
    //   // Whichever fires the event of putting down the seed
    //   params_orig.set("carry", "off"); //Changes the param to be "carry=off" so we don't get the seed in the next level
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
