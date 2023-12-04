import { initGui } from "./gui"
import { Model } from "./Model/Model";
import { Controller, Channel, Player } from "./Controller/Controller";
import { View, ChannelHandler, TopBarHandler } from "./View/View";

//import * as Tone from "tone";
import { initEffects } from "./Controller/Effect";

//{
  //initGui();

  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

  initEffects(controller.audioContext);
//}

document.body.onclick = () => controller.audioContext.resume();

/**
 * @type Channel
 */
const channel = controller.channels[0];
const player  = channel.player;

// TODO: spostare logica in view (flag di appoggio presenti in player)
let rec = false;
let play = false;

document.getElementById("test").addEventListener("click", () => {
  if (rec === false) {
    rec = true;
    player.startRecord(player.play);
  }

  else {
    rec = false;
    player.stopRecord();
    play = true;
    //player.play();
  }
})

document.getElementById("pause").addEventListener("click", () => {
  if (rec) {
    rec = false;
    play = true;
    player.stopRecord();
  }

  else if (play) {
    play = false;
    player.pause();
  }

  else if (!play) {
    play = true;
    player.play();
  }
})

document.getElementById("vol").addEventListener("input", () => {
  // @ts-ignore
  channel.changeGain(Number(document.getElementById("vol").value) / 100);
})

document.getElementById("startStop").addEventListener("click", () => {
  if (rec) {
    rec = false;
    play = true;
    player.stopRecord();
  }

  else if (play) {
    play = false;
    player.stop();
  }

  else if (!play) {
    play = true;
    player.play();
  }
})

let filter = false;
document.getElementById("filter").addEventListener("click", () => {
  if (!filter) {
    channel.setEffect('A', new AudioWorkletNode(controller.audioContext, "Filter"))
    filter = true;
  }

  else {
    channel.removeEffect('A')
    filter = false;
  }
})

document.getElementById("undo").addEventListener("click", player.undo)
