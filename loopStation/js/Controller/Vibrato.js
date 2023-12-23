class Vibrato {
  audioContext;
  model;

  // TODO: probabilmente rimuovere
  frequency;
  depth;
  level;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.frequency = new Number(1); //TODO: time range seems to be 1 secondo
    this.depth     = new Number(1);
    this.level     = new Number(0.5);

    this.mainParam = { "Level": this.level };
    this.params = {
      "Frequency": this.frequency,
      "Depth":     this.depth,
      "Level":     this.level
    };

    // TODO: controllare i range
    this.processor = new Tone.Vibrato(this.model.effects["Vibrato"]["Frequency"].value, this.model.effects["Vibrato"]["Depth"].value);
    this.processor.wet.value = this.model.effects["Vibrato"]["Level"].value;
  }

  modifyMainParam = value => {
    this.modifyParam(value, this.getMainParam());
  }

  modifyParam = (value, param) => {
    this.params[param] = parseInt(value);

    switch (param) {
      case "Level":
        this.processor.wet.value = value;
        break
      case "Frequency":
        this.processor.frequency.value = value;
        break;
      case "Depth":
        this.processor.depth.value = value;
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
    return "Level";
  }

  // TODO: cancellare?
  getRange = () => {
    return {
      "Frequency": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
      },
      "Depth": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: 50,
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

export { Vibrato };
