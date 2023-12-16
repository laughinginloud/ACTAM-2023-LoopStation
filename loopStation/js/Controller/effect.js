// @ts-ignore
import filterUrl from "worklet:./Filter.js";

import { Delay } from "./Delay";

function initTone(audioContext) {
  Tone.setContext(audioContext);
}

function initEffects(audioContext) {
  audioContext.audioWorklet.addModule(filterUrl);
}

function effectFactory(effect, model) {
  switch (effect) {
    case "Delay": return new Delay(model);
    // TODO: resto degli effetti
  }
}

// TODO: gain all'avvio
function connectAudioChain(node, chain) {
  if (chain instanceof GainNode)
    node.connect(chain);

  else
    Tone.connect(node, chain.getNode());
}

function knobRange(angle, type, min, max, step) {
  let val;
  let repr;

  switch (type) {
    case "hz":
      break;
    case "ms":
      val  = Math.round((((angle + 135) / 270) * 90)) + 10;
      repr = val + ' ms';
      break;
    case "percent":
      val  = Math.round((angle + 135) / 2.7) / 100;
      repr = Math.round((angle + 135) / 2.7) + '%';
      break;
    case "st":
      break;
    case "dB":
      break;
    case "nat":
      break;
    case "cutoff":
      break;
  }

  return { val: val, repr: repr };
}

import * as Tone from 'tone';

export { initTone, initEffects, connectAudioChain, effectFactory, knobRange };
