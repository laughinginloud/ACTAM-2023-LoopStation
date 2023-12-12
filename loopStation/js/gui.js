import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function initGui() {
  const editButtons = document.querySelectorAll(".menu_scroll");
  const textbox     = document.getElementById("control_panel");

  const knob  = document.getElementById("knob");
  const knob1 = document.getElementById("eff_parameters");

  let effetti = {
    RIVERBERO: "RIVERBERO\nparam1: 0\nparam2: 0",
    DELAY: "DELAY\nparam1: 0\nparam2: 0",
    CHORUS: "CHORUS\nparam1: 0\nparam2: 0",
  };

  let rotations = {
    RIVERBERO: { knob: 0, knob1: 0 },
    DELAY: { knob: 0, knob1: 0 },
    CHORUS: { knob: 0, knob1: 0 },
  };

  const keys  = Object.keys(effetti); // Ottieni le chiavi dell'oggetto effetti
  let   index = 0;

  // Ottenere il riferimento ai pulsanti previous, next e select
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const selectButton = document.getElementById("select");

  Draggable.create(knob, {
    type: "rotation",
    bounds: { minRotation: -135, maxRotation: 135 },
    onDrag: function () {
      let rotation = Math.round((this.rotation + 135) / 2.7);
      for (let key in effetti) {
        let values = effetti[key].split("\n");
        values[1] =
          "param1: " + (key === keys[index] ? rotation : rotations[key].knob);
        effetti[key] = values.join("\n");
        if (key === keys[index]) {
          rotations[key].knob = rotation;
        }
      }
      textbox.value = effetti[keys[index]];
    },
  });

  Draggable.create(knob1, {
    type: "rotation",
    bounds: { minRotation: -135, maxRotation: 135 },
    onDrag: function () {
      let rotation1 = Math.round((this.rotation + 135) / 2.7);
      for (let key in effetti) {
        let values = effetti[key].split("\n");
        values[2] =
          "param2: " + (key === keys[index] ? rotation1 : rotations[key].knob1);
        effetti[key] = values.join("\n");
        if (key === keys[index]) {
          rotations[key].knob1 = rotation1;
        }
      }
      textbox.value = effetti[keys[index]];
    },
  });

  // Aggiungere l'evento di click a ciascun pulsante
  previousButton.addEventListener("click", () => {
    // Scorrere all'indietro nella lista di parole
    index = (index - 1 + keys.length) % keys.length;
    textbox.value = keys[index];
  });

  nextButton.addEventListener("click", () => {
    // Scorrere in avanti nella lista di parole
    index = (index + 1) % keys.length;
    textbox.value = keys[index];
  });

  selectButton.addEventListener("click", () => {
    // Mostrare i valori associati alla chiave selezionata
    textbox.value = effetti[keys[index]];
  });

  // Aggiungi un evento onclick a ciascun pulsante
  for (const btn of document.querySelectorAll(".rec_button"))
    btn.addEventListener("click", () =>
      btn.classList.toggle("recording_mode"));

  const btns = new Array(
    document.getElementById("global_clear"),
    document.getElementById("clear_last")
  );

  for (let i = 1; i <= 5; ++i) {
    btns.push(document.getElementById("clear"  + i));
    btns.push(document.getElementById("rewind" + i));
  }

  for (const btn of btns)
    btn.addEventListener("click", () => {
      btn.classList.toggle("modifica");
      setTimeout(() => btn.classList.toggle("modifica"), 500);
    });
}

export { initGui };
