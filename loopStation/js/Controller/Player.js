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

    this.rec     = {};
    this.chunks  = [];
  }

  play() {
    alert("Alert");
    //let audioBufferSourceNode = new AudioBufferSourceNode(this.audioContext, {buffer: this.audioBuffer, loop: true});
    //audioBufferSourceNode.start();
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    //console.log(this.audioBuffer);
    source.loop = true;
    source.connect(this.audioContext.destination)
    source.start();
  }

  pause() {

  }

  rewind() {

  }

  clean() {
    //this.audioBuffer  = { cur: new AudioBuffer(this.model.bufferLength, this.model.bufferNumberOfChannels, this), old: null };
    // Altro?
  }

  startRecord() {
    window.navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.rec = new MediaRecorder(stream); // TODO: MIME type?
      this.rec.start();
      this.rec.ondataavailable = e => {
        this.chunks.push(e.data);
      };
      this.rec.onstop = () => {
        //let blob = new Blob(this.chunks, { type: "audio/mp3" });
        //console.log(blob);
        //document.getElementById("audioElement").src = URL.createObjectURL(blob);
        console.log(this.chunks[0]);

        this.chunks[0].arrayBuffer().then(async arrayBuffer => {
          //this.audioBuffer = this.audioContext.createBuffer(this.model.bufferNumberOfChannels, this.model.bufferLength, this.model.bufferSampleRate);
          this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

          //let bufferData = this.audioBuffer.getChannelData(0);
          //for (let i=0; i<bufferData.length; i++) {
          //  console.log(arrayBuffer.data[i]);
          //  bufferData[i] = arrayBuffer[i];
          //}

          //this.audioBuffer.copyToChannel(new Float32Array(arrayBuffer), 0);
          // TODO: stereo
          //for (let i = 0; i < this.model.bufferNumberOfChannels; ++i)
          //  this.audioBuffer.copyToChannel(new Float32Array(arrayBuffer[i]), i);
          this.chunks = [];

          const bs = this.audioContext.createBufferSource();
          bs.buffer = this.audioBuffer;
          bs.playbackRate.value = 1;
          bs.loop = true;
          bs.connect(this.audioContext.destination);
          bs.start()
        })
      };
    });
  }

  recorder(stream) {
    // pass
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
