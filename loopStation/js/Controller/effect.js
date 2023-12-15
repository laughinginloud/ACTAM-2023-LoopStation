// @ts-ignore
import filterUrl from "worklet:./Filter.js";

import { Delay } from "./Delay";

function initEffects(audioContext) {
  audioContext.audioWorklet.addModule(filterUrl);
}

function effectFactory(effect, model) {
  switch (effect) {
    case "Delay": return new Delay(model);
    // TODO: resto degli effetti
  }
}

function connectAudioChain(node, chain) {
  if (chain instanceof GainNode)
    node.connect(chain);

  else
    Tone.connect(node, chain.getNode());
}

import * as Tone from 'tone';

export { initEffects, connectAudioChain, effectFactory };
