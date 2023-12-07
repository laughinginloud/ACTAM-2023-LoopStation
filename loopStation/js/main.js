import { Model }       from "./Model/Model";
import { Controller }  from "./Controller/Controller";
import { View }        from "./View/View";

import { initGui }     from "./gui"
import { initEffects } from "./Controller/Effect";

//import * as Tone from "tone";

{
  initGui();

  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

  initEffects(controller.audioContext);

  document.body.onclick = () => controller.audioContext.resume();
}

