class Delay {
  audioContext;
  model;

  // TODO: probabilmente rimuovere
  time;
  feedback;
  level;

  mainParam;
  params;
  processor;

  constructor(model) {
    this.audioContext = Tone.Context;
    this.model        = model;

    this.time     = new Number(1); //TODO: time range seems to be 1 secondo
    this.feedback = new Number(1);
    this.level    = new Number(0.5);

    this.mainParam = { "Level": this.level };
    this.params = {
      "Time":     this.time,
      "Feedback": this.feedback,
      "Level":    this.level
    };

    // TODO: controllare i range
    this.processor = new Tone.FeedbackDelay(this.model.effects["Delay"]["Time"].value / 10, this.model.effects["Delay"]["Feedback"].value);
    this.processor.wet.value = this.model.effects["Delay"]["Level"].value;
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
      case "Time":
        this.processor.delayTime.value = value;
        break;
      case "Feedback":
        this.processor.feedback.value = value;
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
      "Time": {
        value: this.processor.delayTime.value,
        type:  "ms",
        min:   10,
        max:   100,
        step:  1
      },
      "Feedback": {
        value: this.processor.feedback.value,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: this.processor.wet.value,
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

export {Delay};
