class HighpassFilter {
  audioContext;
  model;

  cutoff;
  resonance;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.cutoff    = new Number(20);
    this.resonance = new Number(0);

    this.mainParam = { "Cutoff": this.cutoff };
    this.params = {
      "Cutoff":    this.cutoff,
      "Resonance": this.resonance
    };

    // TODO: controllare i range
    this.processor = new Tone.Filter(this.model.effects["Highpass filter"]["Cutoff"].value, "highpass", -12);
    this.processor.Q.value = this.model.effects["Highpass filter"]["Resonance"].value / 100; // TODO: trovare soluzione più pulita per percentuali
  }

  modifyMainParam = value => {
    this.modifyParam(value, this.getMainParam());
  }

  modifyParam = (value, param) => {
    this.params[param] = parseInt(value);

    switch (param) {
      case "Cutoff":
        this.processor.frequency.value = value;
        break
      case "Resonance":
        this.processor.Q.value = value;
        break;
    }
  }

  getNode = () => {
    return this.processor;
  }

  connect = audioChain => {
    connectAudioChain(this.processor, audioChain);
  }

  disconnect = () => {
    this.processor.disconnect();
  }

  getMainParam = () => {
    return "Cutoff";
  }

  // TODO: cancellare?
  getRange = () => {
    return {
      "Cutoff": {
        value: 20,
        type:  "cutoff",
        min:   20,
        max:   22000,
        step:  1
      },
      "Resonance": {
        value: 0,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    };
  }
}

import * as Tone from 'tone';
import { connectAudioChain } from './effect';

export { HighpassFilter };
