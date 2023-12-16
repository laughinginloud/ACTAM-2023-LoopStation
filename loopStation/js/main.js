import { Model }      from "./Model/Model";
import { Controller } from "./Controller/Controller";
import { View }       from "./View/View";

import { initGui }               from "./gui";
import { initTone, initEffects } from "./Controller/effect";

{
  const audioContext = new AudioContext();
  const manopole     = initGui();

  initTone(audioContext);
  initEffects(audioContext);

  const model      = new Model();
  const controller = new Controller(model, audioContext);
  const view       = new View(model, controller, manopole);

  document.body.onclick = () => audioContext.resume();
}
