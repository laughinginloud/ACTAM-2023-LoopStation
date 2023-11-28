class Player {
  audioContext;
  audioBuffer;
  bufferOptions;

  rec;     // TODO: Reneame me, please!
  chunks;  // TODO: Reneame me, please!
  recFlag; // TODO: Reneame me, please!

  constructor(audioContext, bufferOptions) {
    this.audioContext  = audioContext;
    this.bufferOptions = bufferOptions;
    this.clean();

    this.rec     = null;
    this.chunks  = [];
    this.recFlag = false;
  }

  play() {
    alert("Alert");
  }

  pause() {

  }

  rewind() {

  }

  clean() {
    this.audioBuffer  = { cur: new AudioBuffer(this.bufferOptions), old: null };
    // Altro?
  }

  startRecord() {
    this.recFlag = true;

    window.navigator.mediaDevices.getUserMedia({ audio: boolean }).then(stream => this.recorder);
  }

  recorder(stream) {
    this.rec = new MediaRecorder(stream);
    this.rec.start();
    this.rec.ondatavailable = e => {
      this.chunks.push(e.data);

      if (!this.recFlag)
        this.rec.stop();
    };
  }

  stopRecord() {
    this.recFlag = false;

    let dubOptions = this.bufferOptions;

    if (this.audioBuffer.cur !== null)
      dubOptions.length = this.audioBuffer.duration;

    this.audioBuffer.old = new AudioBuffer(this.bufferOptions);
    for (let i = 0; i < this.audioBuffer.old.numberOfChannels; ++i) {
      const samples = this.audioBuffer.cur.getChannelData(i);
      this.audioBuffer.old.copyToChannel(samples, i);
    }

    // prende la lista di chunks, mixa i chunks con il buffer
  }

  undo() {
    this.audioBuffer = { cur: this.audioBuffer.old, old: this.audioBuffer.old };
  }
}

export { Player };
