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

  /**
   * @param {'A' | 'B' | 'C'} slot
   */
  getEffect(slot) {
    return this.effects[String(slot).trim()];
  }

  /**
   * @param {'A' | 'B' | 'C'} slot
   * @param {AudioWorkletNode} effect
   */
  setEffect(slot, effect) {
    this.player.pause();

    this.effects[String(slot).trim()] = effect;
    this.rebuildChain();

    this.player.play();
  }

  /**
   * @param {'A' | 'B' | 'C'} slot
   */
  removeEffect(slot) {
    this.setEffect(slot, null);
  }

  connectPlayer(audioBufferSourceNode) {
    audioBufferSourceNode.connect(this.audioChain);
  }

  rebuildChain() {
    this.audioChain = this.gain;

    // Costruisce la catena a partire dalla fine
    for (const i of ['C', 'B', 'A'])
      if (this.effects[i]) {
        this.effects[i].disconnect();
        this.effects[i].connect(this.audioChain);
        this.audioChain = this.effects[i];
      }
  }
}

import { Player } from "./Player.js";

export { Channel };
