import { Model } from "./Model/Model.js";
import { Controller, Channel, Player } from "./Controller/Controller.js";
import { View, ChannelHandler, TopBarHandler } from "./View/View.js";

{
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

 // init vari
}

var knob = document.getElementById("knob");
Draggable.create(knob, {
  type:"rotation",
  bounds:{minRotation:0, maxRotation:270},
  onDrag:function() {
   var rotation = parseInt(this.rotation %  360, 10);
    /*output.innerHTML = (rotation < 0) ? rotation + 360 : rotation;*/
    var textarea = document.getElementById('control_panel');
    textarea.value = rotation;
  }
});

var knob1 = document.getElementById("eff_parameters");
Draggable.create(knob1, {
  type:"rotation",
  bounds:{minRotation:0, maxRotation:270},
  onDrag:function() {
    var rotation = parseInt(this.rotation % 360, 10);
    /*output.innerHTML = (rotation < 0) ? rotation + 360 : rotation;*/
  }
});

// NON CREDO SI FACCIA COSI QUINDI LO LASCIO COME COMMENTO
//import 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js'
//import 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/utils/Draggable.min.js'>
//import 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/ThrowPropsPlugin.min.js'>

