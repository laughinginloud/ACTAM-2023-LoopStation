class Channel {
  audioContext;
  player;
  buffer;
  effectChain;
  gain;

  constructor(audioContext, model) {
    this.audioContext = audioContext;
    this.buffer = new AudioBuffer(model.getBufferOptions());

    this.player = new Player(this.audioContext, this.buffer);

    // effectChain = [delay, ds-1, ...]

    this.gain = new GainNode(this.audioContext, { channelCount: 2 });
  }

  getPlayer() {
    return this.player;
  }
}

import {Player} from "./Player.js";

export { Channel };
