class Reverb {
  audioContext;
  model;

  // TODO: probabilmente rimuovere
  roomSize;
  dampening;
  level;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.roomSize  = new Number(1); //TODO: time range seems to be 1 secondo
    this.dampening = new Number(1);
    this.level     = new Number(0.5);

    this.mainParam = { "Level": this.level };
    this.params = {
      "Room size": this.roomSize,
      "Dampening": this.dampening,
      "Level":     this.level
    };

    // TODO: controllare i range
    this.processor = new Tone.Freeverb(this.model.effects["Reverb"]["Room size"].value, this.model.effects["Reverb"]["Dampening"].value);
    this.processor.wet.value = this.model.effects["Reverb"]["Level"].value;
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
      case "Room size":
        this.processor.roomSize.value = value;
        break;
      case "Dampening":
        this.processor.dampening = value;
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
      "Room size": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Dampening": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
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

export { Reverb };
