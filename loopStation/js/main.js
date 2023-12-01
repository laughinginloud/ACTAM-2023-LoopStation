import { initGui } from "./gui"
import { Model } from "./Model/Model";
import { Controller, Channel, Player } from "./Controller/Controller";
import { View, ChannelHandler, TopBarHandler } from "./View/View";

import * as Tone from "tone";

//{
  //initGui();

  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);
//}

document.body.onclick = () => controller.audioContext.resume();

let rec = false;
document.getElementById("test").addEventListener("click", () => {
  if (rec === false) {
    rec = true;
    controller.channels[0].player.startRecord();
  }

  else {
    rec = false;
    controller.channels[0].player.stopRecord();
    //controller.channels[0].player.play();
  }
})

document.getElementById("pause").addEventListener("click", () => {
  controller.channels[0].player.pause();
})
