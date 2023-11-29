class Player {
  audioContext;
  audioBuffer;
  model;

  rec;     // TODO: Reneame me, please!
  chunks;  // TODO: Reneame me, please!
  recFlag; // TODO: Reneame me, please!

  constructor(audioContext, model) {
    this.audioContext  = audioContext;
    this.model = model;
    this.clean();

    this.rec     = null;
    this.chunks  = [];
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
    window.navigator.mediaDevices.getUserMedia({ audio: boolean }).then(this.recorder);
  }

  recorder(stream) {
    this.rec = new MediaRecorder(stream);
    this.rec.start();
    this.rec.ondatavailable = e => {
      this.chunks.push(e.data);
      if (this.rec.state == "inactive") {
        let blob = new Blob(this.chunks, { type: "audio/mp3" });
        console.log(blob);
        document.getElementById("audioElement").src = URL.createObjectURL(blob);
      }
    };
  }

  stopRecord() {
    //let dubOptions = this.model.getBufferOptions();
    //if (this.model.firstRecord) {
    //  this.model.setBufferLength(this.audioBuffer.duration)
    //}
    this.rec.stop();
    /*
    if (this.audioBuffer.cur !== null)
      dubOptions.length = this.audioBuffer.duration;

    this.audioBuffer.old = new AudioBuffer(this.bufferOptions);
    for (let i = 0; i < this.audioBuffer.old.numberOfChannels; ++i) {
      const samples = this.audioBuffer.cur.getChannelData(i);
      this.audioBuffer.old.copyToChannel(samples, i);
    }
    */

    // prende la lista di chunks, mixa i chunks con il buffer
  }

  undo() {
    this.audioBuffer = { cur: this.audioBuffer.old, old: this.audioBuffer.old };
  }
}

export { Player };
