class Player {
  audioContext;
  audioBuffer;

  constructor(audioContext, audioBuffer) {
    this.audioContext = audioContext;
    this.audioBuffer  = audioBuffer;
  }

  play() {
    alert("Alert");
  }

  pause() {

  }

  rewind() {

  }

  clean() {

  }

  startRecord() {

  }

  stopRecord() {

  }
}

export { Player };
