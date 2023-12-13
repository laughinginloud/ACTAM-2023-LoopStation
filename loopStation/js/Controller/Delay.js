class Delay {
  audioContext;

  time;
  feedback;
  level;

  mainParam;
  params;
  processor;
  crossFader;

  constructor() {
    this.audioContext = Tone.Context;

    this.time     = new Number(1); //TODO: time range seems to be 1 secondo
    this.feedback = new Number(0);
    this.level    = new Number(0.5);

    this.mainParam = { "Level": this.level };
    this.params = {
      "Time":     this.time,
      "Feedback": this.feedback,
      "Level":    this.level
    };

    this.processor = new Tone.FeedbackDelay(this.time.valueOf(), this.feedback.valueOf());
  }

  modifyMainParam = value => {
    this.mainParam.Level = parseInt(value);
    this.processor.wet.value = value;
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
    //this.processor.connect(audioChain);
    //Tone.connect(audioChain, this.processor);
    this.processor.chain(audioChain);
  }

  disconnect = () => {
    this.processor.disconnect();
  }

  getRange = () => {
    return {
      'Time' : {'min': 0, 'max': 1, 'step': 0.01},
      'Feedback' : {'min': 0, 'max': 1, 'step': 0.01},
      'Level' : {'min': 0, 'max': 1, 'step': 0.01}
    };
  }

  handler = () => {
    // TODO: delay
  }
}

import * as Tone from 'tone';

export {Delay};
