function initGui() {
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

  let buttons = document.querySelectorAll(".rec_button");

// Aggiungi un evento onclick a ciascun pulsante
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        // Aggiungi la classe 'pl' al pulsante cliccato
        this.classList.toggle("recording_mode");
    }
}

let play = document.querySelectorAll(".sp_button");
let edit = document.querySelectorAll(".edit");
let clear=document.querySelectorAll(".clear_module");
let effect=document.querySelectorAll(".effect");
let global=document.querySelectorAll(".console_control");

// Aggiungi un evento onclick a ciascun pulsante
for (let i = 0; i < play.length; i++) {
    play[i].onclick = function() {
        this.classList.toggle("modifica");
    }
}
for (let i = 0; i < edit.length; i++) {
    edit[i].onclick = function() {
        this.classList.toggle("modifica");
    }
}
for (let i = 0; i < clear.length; i++) {
    clear[i].onclick = function() {
        this.classList.toggle("modifica");
    }
}
for (let i = 0; i < effect.length; i++) {
    effect[i].onclick = function() {
        this.classList.toggle("modifica");
    }
}
for (let i = 0; i < global.length; i++) {
    global[i].onclick = function() {
        this.classList.toggle("modifica");
    }
}


}

export { initGui }
