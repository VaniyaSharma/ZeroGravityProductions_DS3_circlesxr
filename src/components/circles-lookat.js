'use strict';

AFRAME.registerComponent('circles-lookat', {
  schema: {
    targetElement:  {type:'selector', default:null},
    enabled:        {type:'boolean',  default:true},
    constrainYAxis: {type:'boolean',  default:true},
    constrainXAxis: {type:'boolean',  default:false},  // ZGS: Created new schema to constrain the x-axis
    constrainZAxis: {type:'boolean',  default:false},  // ZGS: Created new schema to constrain the z-axis
    updateRate:     {type:'number',   default:200},    //in ms
    smoothingOn:    {type:'boolean',  default:true},
    smoothingAlpha: {type:'float',    default:0.05}
  },
  init: function() {
    const CONTEXT_AF  = this;

    CONTEXT_AF.prevTime       = 0;
    CONTEXT_AF.captureTime    = false;    
    CONTEXT_AF.worldPos       = new THREE.Vector3();
    CONTEXT_AF.targetWorldPos = new THREE.Vector3();
    CONTEXT_AF.originalPos    = new THREE.Vector3();
    CONTEXT_AF.el.object3D.getWorldPosition(CONTEXT_AF.originalPos);
  },
  update : function(oldData) {
    const CONTEXT_AF = this;
    const data = this.data;

    if (Object.keys(data).length === 0) { return; } // No need to update. as nothing here yet

    if (oldData.targetElement !== data.targetElement) {
      //if no target, use camera by default
      if (!data.targetElement) {
        CONTEXT_AF.setForNullTarget();
      }
    }
  },
  tick : function (time, timeDelta) {
    if (this.data.enabled === true && this.data.targetElement) {
      if (time - this.prevTime > this.data.updateRate) {
        this.data.targetElement.object3D.getWorldPosition(this.targetWorldPos);

        if (this.data.smoothingOn !== true) {
          this.worldPos.set(this.targetWorldPos.x, this.targetWorldPos.y, this.targetWorldPos.z);
          
          // Apply constraints
          if (this.data.constrainYAxis === true) {
            this.worldPos.y = this.originalPos.y;
          }
          if (this.data.constrainXAxis === true) {
            this.worldPos.x = this.originalPos.x;
          }
          if (this.data.constrainZAxis === true) {
            this.worldPos.z = this.originalPos.z;
          }
          
          this.el.object3D.lookAt(this.worldPos);
        }
        
        this.prevTime = time;
      }
      else if (this.data.smoothingOn === true) {
        this.worldPos.lerp(this.targetWorldPos, this.data.smoothingAlpha);
        
        // Apply constraints
        if (this.data.constrainYAxis === true) {
          this.worldPos.y = this.originalPos.y;
        }
        if (this.data.constrainXAxis === true) {
          this.worldPos.x = this.originalPos.x;
        }
        if (this.data.constrainZAxis === true) {
          this.worldPos.z = this.originalPos.z;
        }

        this.el.object3D.lookAt(this.worldPos);
      }
    }
  },
  setForNullTarget : function() {
    const CONTEXT_AF = this;

    if (CIRCLES.isReady()) {
      CONTEXT_AF.el.setAttribute('circles-lookat', {targetElement:CIRCLES.getMainCameraElement()});
    }
    else {
      const readyFunc = function (e) {
        CONTEXT_AF.el.setAttribute('circles-lookat', {targetElement:CIRCLES.getMainCameraElement()});
        CONTEXT_AF.el.sceneEl.removeEventListener(CIRCLES.READY, readyFunc);
      };
      CONTEXT_AF.el.sceneEl.addEventListener(CIRCLES.EVENTS.READY, readyFunc);
    }
  }
});