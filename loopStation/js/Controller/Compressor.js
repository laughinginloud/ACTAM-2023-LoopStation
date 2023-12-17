class Compressor {
  audioContext;
  model;

  // TODO: probabilmente rimuovere
  threshold;
  ratio;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.threshold = new Number(1); // TODO: fix
    this.ratio     = new Number(0);

    this.mainParam = { "Threshold": this.threshold };
    this.params = {
      "Threshold": this.threshold,
      "Ratio":     this.ratio
    };

    // TODO: controllare i range
    this.processor = new Tone.Compressor(this.model.effects["Compressor"]["Threshold"].value, this.model.effects["Compressor"]["Ratio"].value);
  }

  modifyMainParam = value => {
    this.modifyParam(value, this.getMainParam());
  }

  modifyParam = (value, param) => {
    this.params[param] = parseInt(value);

    switch (param) {
      case "Threshold":
        this.processor.threshold.value = value;
        break;
      case "Ratio":
        this.processor.ratio.value = value;
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
    return "Threshold";
  }

  // TODO: cancellare?
  getRange = () => {
    return {
      "Threshold": {
        value: -100,
        type:  "dB",
        min:   -100,
        max:   0,
        step:  1
      },
      "Ratio": {
        value: 0,
        type:  "nat",
        min:   0,
        max:   100,
        step:  1
      }
    };
  }
}

import * as Tone from 'tone';
import { connectAudioChain } from './effect';

export { Compressor };
