import { Model }       from "./Model/Model";
import { Controller }  from "./Controller/Controller";
import { View }        from "./View/View";

import { initTone }     from "./atone";
import { initGui }     from "./gui";
import { initEffects } from "./Controller/Effect";

import { Delay } from "./Controller/Delay"; //sta qui solo per test

{
  const audioContext = new AudioContext();
  const manopole = initGui();
  initTone(audioContext);

  const model = new Model();
  const controller = new Controller(model, audioContext);
  const view = new View(model, controller, manopole);

  initEffects(audioContext);

  document.body.onclick = () => audioContext.resume();
}
