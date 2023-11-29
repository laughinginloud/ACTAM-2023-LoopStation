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