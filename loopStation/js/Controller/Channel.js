class Channel {
  audioContext;
  player;
  buffer;
  audioChain;
  effects;
  gain;

  constructor(audioContext, model) {
    this.audioContext = audioContext;

    this.effects = {
      A: null,
      B: null,
      C: null
    }

    this.gain = new GainNode(this.audioContext, { channelCount: 2 });
    this.gain.connect(audioContext.destination);

    this.audioChain = this.gain;

    this.player = new Player(this.audioContext, model, this);
  }

  getPlayer() {
    return this.player;
  }

  changeGain(gain) {
    this.gain.gain.value = gain;
  }

  getEffect(slot) {
    return this.effects[String(slot).trim()];
  }

  setEffect(slot, effect) {
    this.player.pause();

    this.effects[String(slot).trim()] = effect;
    this.rebuildChain();

    this.player.play();
  }

  connectPlayer(audioBufferSourceNode) {
    audioBufferSourceNode.connect(this.audioChain);
  }

  rebuildChain() {
    this.audioChain = this.gain;

    for (const i of ['C', 'B', 'A'])
      if (this.effects[i]) {
        this.effects[i].disconnect();
        this.effects[i].connect(this.audioChain);
        this.audioChain = this.effects[i];
      }
  }
}

import { Player } from "./Player.js";
//import { Filter } from "./Filter.js";

export { Channel };
