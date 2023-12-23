function initTone(audioContext) {
  Tone.setContext(audioContext);
}

function effectFactory(effect, model) {
  const eff = (() => {
    switch (effect) {
      case "Chorus":          return Chorus;
      case "Delay":           return Delay;
      case "Reverb":          return Reverb;
      case "Vibrato":         return Vibrato;
      case "Tremolo":         return Tremolo;
      case "Pitch shift":     return PitchShift;
      case "Highpass filter": return HighpassFilter;
      case "Lowpass filter":  return LowpassFilter;
      case "Compressor":      return Compressor;

      // Teoricamente mai chiamato
      default: console.log(effect + " non è un effetto valido." + "\n" + "Thus I die. Thus, thus, thus. Now I am dead, Now I am fled, My soul is in the sky. Tongue, lose thy light. Moon take thy flight. Now die, die, die, die.");
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

  let minv;
  let maxv;
  let scale;

  angle = (angle + 135) / 270; //0-1

  switch (type) {
    case "hz":
      minv = Math.log(0.1);
      maxv = Math.log(10);
      scale = (maxv-minv) / 100;
      val = Math.exp(minv + scale*(angle * 100));
      repr = val.toString().slice(0,4) + ' Hz';
      break;
    case "ms":
      val  = (Math.round((angle * 90)) + 10) / 100;
      repr = Math.round((angle * 90)) + 10 + ' ms';
      break;
    case "percent":
      val  = angle;
      repr = Math.round(angle * 100) + '%';
      break;
    case "st":
      val  = Math.round(angle * 24) - 12;
      repr = val + ' st';
      break;
    case "dB":
      val = Math.round((angle * 100) - 100);
      repr = val + ' dB';
      break;
    case "nat":
      val = Math.round((angle * 19) +1);
      repr = val + ' dB';
      break;
    case "cutoff":
      minv = Math.log(20);
      maxv = Math.log(22000);
      scale = (maxv-minv) / 100;
      val = Math.exp(minv + scale*(angle * 100));
      repr = Math.round(val) + ' Hz';
      break;
    case "q":
      maxv = 20;
      val = (angle * maxv);
      repr = Math.round(val);
      break;
  }

  return { val: val, repr: repr };
}

import * as Tone from 'tone';

import { Chorus }         from "./Chorus";
import { Delay }          from "./Delay";
import { Reverb }         from "./Reverb";
import { Vibrato }        from "./Vibrato";
import { Tremolo }        from "./Tremolo";
import { PitchShift }     from "./PitchShift";
import { Compressor }     from "./Compressor";
import { HighpassFilter } from "./HighpassFilter";
import { LowpassFilter }  from './LowpassFilter';

export { initTone, connectAudioChain, effectFactory, knobRange };
