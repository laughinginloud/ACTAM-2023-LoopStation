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

  const manopolone = Draggable.create(knob, {
    type: "rotation",
    bounds: { minRotation: -135, maxRotation: 135 },
  })[0];

  const manopolino = Draggable.create(knob1, {
    type: "rotation",
    bounds: { minRotation: -135, maxRotation: 135 },
  })[0];

  // Aggiungi un evento onclick a ciascun pulsante
  for (const btn of document.querySelectorAll(".rec_button"))
    btn.addEventListener("click", () => {
      if (!btn.attributes["disabled"])
        btn.classList.toggle("recording_mode");
    });

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


  document.getElementById("effA")      .setAttribute("disabled", "disabled");
  document.getElementById("effB")      .setAttribute("disabled", "disabled");
  document.getElementById("effC")      .setAttribute("disabled", "disabled");
  document.getElementById("clear_last").setAttribute("disabled", "disabled");

  manopolone.disable();
  manopolino.disable();

  return { manopolone: manopolone, manopolino: manopolino };
}

export { initGui };
