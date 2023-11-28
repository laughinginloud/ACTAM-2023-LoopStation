class Controller {
  model;

  audioContext;
  channels;

  constructor(model) {
    this.model = model;

    this.audioContext = new AudioContext();

    this.channels = new Array(this.model.numChannels);

    for (let i = 0; i < this.model.numChannels; ++i) {
      this.channels[i] = new Channel(this.audioContext, this.model);
    }
  }

  getChannel(n) {
    return this.channels[n];
  }

  // mixer -> ChannelMergerNode (TODO check: sembra per unire più canali à la surround)
}

import { Channel } from "./Channel.js";
import { Player }  from "./Player.js";
export { Controller, Channel, Player };
