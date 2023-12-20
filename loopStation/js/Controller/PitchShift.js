class PitchShift {
  audioContext;
  model;

  // TODO: probabilmente rimuovere
  pitch;
  level;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.pitch = new Number(1); // TODO: fix
    this.level = new Number(1);

    this.mainParam = { "Pitch": this.pitch };
    this.params = {
      "Pitch": this.pitch,
      "Level": this.level
    };

    // TODO: controllare i range
    this.processor           = new Tone.PitchShift();
    this.processor.pitch     = this.model.effects["Pitch shift"]["Pitch"].value;
    this.processor.wet.value = this.model.effects["Pitch shift"]["Level"].value / 100; // TODO: trovare soluzione più pulita per percentuali
  }

  modifyMainParam = value => {
    this.modifyParam(value, this.getMainParam());
  }

  modifyParam = (value, param) => {
    this.params[param] = parseInt(value);

    switch (param) {
      case "Level":
        this.processor.wet.value = value;
        break;
      case "Pitch":
        this.processor.pitch = value;
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
    return "Pitch";
  }

  // TODO: cancellare?
  getRange = () => {
    return {
      "Pitch": {
        value: 12,
        type:  "st",
        min:   -24,
        max:   24,
        step:  1
      },
      "Level": {
        value: 100,
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

export { PitchShift };
