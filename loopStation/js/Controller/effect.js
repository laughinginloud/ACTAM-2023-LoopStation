// @ts-ignore
import filterUrl from "worklet:./Filter.js";

function initTone(audioContext) {
  Tone.setContext(audioContext);
}

function initEffects(audioContext) {
  audioContext.audioWorklet.addModule(filterUrl);
}

function effectFactory(effect, model) {
  const eff = (() => {
    switch (effect) {
      case "Chorus":      return Chorus;
      case "Delay":       return Delay;
      case "Reverb":      return Reverb;
      case "Vibrato":     return Vibrato;
      case "Tremolo":     return Tremolo;
      case "Pitch shift": return PitchShift;
      // TODO: Filtro
      case "Compressor":  return Compressor;

      default: console.log(effect + " non è un effetto valido." + "\n" + "Thus I die. Thus, thus, thus. Now I am dead, Now I am fled, My soul is in the sky. Tongue, lose thy light. Moon take thy flight. Now die, die, die, die.")
    }
  })();

  return new eff(model);
}

// TODO: check perché gain all'avvio
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
      // TODO
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
      // TODO
      break;
    case "dB":
      // TODO
      break;
    case "nat":
      // TODO
      break;
    case "cutoff":
      // TODO
      break;
  }

  return { val: val, repr: repr };
}

import * as Tone from 'tone';

import { Chorus }     from "./Chorus";
import { Delay }      from "./Delay";
import { Reverb }     from "./Reverb";
import { Vibrato }    from "./Vibrato";
import { Tremolo }    from "./Tremolo";
import { PitchShift } from "./PitchShift";
import { Compressor } from "./Compressor";

export { initTone, initEffects, connectAudioChain, effectFactory, knobRange };
