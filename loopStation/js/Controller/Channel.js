class Channel {
  audioContext;
  player;
  buffer;
  effectChain;
  gain;

  constructor(audioContext, model) {
    this.audioContext = audioContext;

    // effectChain = [delay, ds-1, ...]

    this.gain = new GainNode(this.audioContext, { channelCount: 2 });
    this.gain.connect(audioContext.destination);

    this.player = new Player(this.audioContext, model, this.gain);
  }

  getPlayer() {
    return this.player;
  }

  changeGain(gain) {
    this.gain.gain.value = gain;
  }
}

import { Player } from "./Player.js";

export { Channel };
