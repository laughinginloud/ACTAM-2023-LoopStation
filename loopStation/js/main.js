import { Model } from "./Model/Model.js";
import { Controller, Channel, Player } from "./Controller/Controller.js";
import { View, ChannelHandler, TopBarHandler } from "./View/View.js";

{
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

  // init vari
  let knob = document.getElementById("knob");
  Draggable.create(knob, {
    type:   "rotation",
    bounds: {minRotation:0, maxRotation:270},
    onDrag: function() {
      let rotation = parseInt(this.rotation %  360, 10);
      /*output.innerHTML = (rotation < 0) ? rotation + 360 : rotation;*/
      let textarea = document.getElementById('control_panel');
      textarea.value = rotation;
    }
  });

  let knob1 = document.getElementById("eff_parameters");
  Draggable.create(knob1, {
    type:"rotation",
    bounds:{minRotation:0, maxRotation:270},
    onDrag:function() {
      let rotation = parseInt(this.rotation % 360, 10);
      /*output.innerHTML = (rotation < 0) ? rotation + 360 : rotation;*/
    }
  });
}
