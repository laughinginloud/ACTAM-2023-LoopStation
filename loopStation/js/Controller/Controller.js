class Controller {
  model;

  audioContext;
  channels;
  //mixer;

  constructor(model, audioContext) {
    this.model = model;

    this.audioContext = audioContext;

    this.channels = new Array(this.model.numChannels);

    for (let i = 0; i < this.model.numChannels; ++i) {
      this.channels[i] = new Channel(this.audioContext, this.model, i);
    }

    //this.mixer = new Mixer();
    //this.mixer.connectAll(channels); //connette tutti i gain dei canali a un unico oggetto mixer (limiter)
  }
  
  getChannel = n => {
    return this.channels[n];
  }

}

import { Channel } from "./Channel.js";
//import { Mixer } from "./Mixer.js";
export { Controller };
