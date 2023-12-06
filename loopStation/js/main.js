import { initGui } from "./gui"
import { Model } from "./Model/Model";
import { Controller, Channel, Player } from "./Controller/Controller";
import { View, ChannelHandler, TopBarHandler } from "./View/View";

//import * as Tone from "tone";
import { initEffects } from "./Controller/Effect";

//{
  initGui();

  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

  initEffects(controller.audioContext);
//}

document.body.onclick = () => controller.audioContext.resume();
