class Channel {
  audioContext;
  player;
  buffer;
  effectChain;
  gain;

  constructor(audioContext, model) {
    this.audioContext = audioContext;

    this.effectChain = {
      A: null,
      B: null,
      C: null
    }

    this.gain = new GainNode(this.audioContext, { channelCount: 2 });
    this.gain.connect(audioContext.destination);

    this.player = new Player(this.audioContext, model, this);
  }

  getPlayer() {
    return this.player;
  }

  changeGain(gain) {
    this.gain.gain.value = gain;
  }

  getEffect(slot) {
    return this.effectChain[String(slot).trim()];
  }

  setEffect(slot, effect) {
    this.player.pause();
    this.effectChain[String(slot).trim()] = effect;
    this.player.play();
  }

  connectPlayer(audioBufferSourceNode) {
    let lastNode = audioBufferSourceNode;

    for (const i in this.effectChain) {
      if (this.effectChain[i]) {
        lastNode.connect(this.effectChain[i]);
        lastNode = this.effectChain[i];
      }
    }

    lastNode.connect(this.gain);
  }
}

import { Player } from "./Player.js";

export { Channel };
