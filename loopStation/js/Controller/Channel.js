class Channel {
  audioContext;
  player;
  buffer;
  audioChain;
  effects;
  gain;

  constructor(audioContext, model, index) {
    this.audioContext = audioContext;

    this.effects = {
      A: null,
      B: null,
      C: null
    }

    this.gain = new GainNode(this.audioContext, { channelCount: 2 });
    this.gain.connect(audioContext.destination);

    this.audioChain = this.gain;

    this.player = new Player(this.audioContext, model, this, index);
  }

  getPlayer = () => {
    return this.player;
  }

  changeGain = gain => {
    this.gain.gain.value = gain;
  }

  /**
   * @param {'A' | 'B' | 'C'} slot
   */
  getEffect = slot => {
    return this.effects[String(slot).trim()];
  }

  /**
   * @param {'A' | 'B' | 'C'} slot
   * @param {AudioWorkletNode} effect
   */
  setEffect = (slot, effect) => {
    this.player.pause();

    this.effects[String(slot).trim()] = effect;
    this.rebuildChain();

    //this.player.play();
  }

  /**
   * @param {'A' | 'B' | 'C'} slot
   */
  removeEffect = slot => {
    this.setEffect(slot, null);
  }

  connectPlayer = audioBufferSourceNode => {
    connectAudioChain(audioBufferSourceNode, this.audioChain);
  }

  rebuildChain = () => {
    //let chain = [];
    this.audioChain = this.gain;
    //chain.push(this.audioChain);

    // Costruisce la catena a partire dalla fine
    for (const i of ['C', 'B', 'A'])
      if (this.effects[i]) {
        this.effects[i].disconnect();
        this.effects[i].connect(this.audioChain);
        this.audioChain = this.effects[i];
        //chain.push(this.audioChain);
      }
      //console.log('my chain:', chain);
  }

}


import * as Tone from 'tone';
import { Player } from "./Player.js";
import { connectAudioChain } from "./effect.js"

export { Channel };
