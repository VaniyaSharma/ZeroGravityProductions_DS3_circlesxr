'use strict';

AFRAME.registerComponent('circles-sendpoint', {
  schema: {
    target: {type: 'selector'}    //pass in id to checkpoint you want user to go to ...
  },

  init: function () {
    const CONTEXT_AF = this;
    console.log(CONTEXT_AF.data.target);
  },

  update: function () {
    
  }
});