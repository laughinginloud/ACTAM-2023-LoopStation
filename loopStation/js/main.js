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

// TODO: spostare logica in view (flag di appoggio presenti in player)
let rec = false;
let play = false;

document.getElementById("test").addEventListener("click", () => {
  if (rec === false) {
    rec = true;
    controller.channels[0].player.startRecord();
  }

  else {
    rec = false;
    controller.channels[0].player.stopRecord();
    play = true;
    //controller.channels[0].player.play();
  }
})

document.getElementById("pause").addEventListener("click", () => {
  if (rec) {
    rec = false;
    play = true;
    controller.channels[0].player.stopRecord();
  }

  else if (play) {
    play = false;
    controller.channels[0].player.pause();
  }

  else if (!play) {
    play = true;
    controller.channels[0].player.play();
  }
})

document.getElementById("vol").addEventListener("input", () => {
  controller.channels[0].changeGain(Number(document.getElementById("vol").value) / 100);
})

document.getElementById("startStop").addEventListener("click", () => {
  if (rec) {
    rec = false;
    play = true;
    controller.channels[0].player.stopRecord();
  }

  else if (play) {
    play = false;
    controller.channels[0].player.stop();
  }

  else if (!play) {
    play = true;
    controller.channels[0].player.play();
  }
})
