class Player {
  audioContext;
  audioBuffer;
  model;
  channel;

  /**
   * @type {AudioBufferSourceNode}
   */
  audioBufferSource;

  rec;     // TODO: Rename me, please!
  chunks;  // TODO: Rename me, please!

  flags;

  startTime;

  constructor(audioContext, model, channel) {
    this.audioContext = audioContext;
    this.model = model;
    this.clean();

    this.rec = {};
    this.chunks = [];

    this.audioBufferSource = null;

    this.startTime = 0;

    this.channel = channel;

    this.flags = {
      play: false,
      rec: false
    }
  }

  play() {
    console.log("Play");
    //let audioBufferSourceNode = new AudioBufferSourceNode(this.audioContext, {buffer: this.audioBuffer, loop: true});
    //audioBufferSourceNode.start();
    //console.log(this.audioBuffer);

    this.flags.play = true;

    // TODO: null-check (causa: pressione undo quando il canale è vuoto)
    if (this.audioBuffer) {
      this.audioBufferSource = this.audioContext.createBufferSource();
      this.audioBufferSource.buffer = this.audioBuffer;
      this.audioBufferSource.playbackRate.value = 1;
      this.audioBufferSource.loop = true;
      this.channel.connectPlayer(this.audioBufferSource);
      this.audioBufferSource.start(0, this.startTime);
    }
  }

  pause() {
    this.flags.play = false;

    this.audioBufferSource?.stop();
    // TODO: salvare tempo di interruzione in startTime (stop non lo segnala e non parrebbe esserci un parametro in audioBufferSource, quindi bisogna cronometrare)
    // Per cronometro: https://stackoverflow.com/questions/31644060/how-can-i-get-an-audiobuffersourcenodes-current-time
  }

  stop() {
    this.flags.play = false;

    this.audioBufferSource?.stop();
    this.startTime = 0;
  }

  rewind() {}

  clean() {
    //this.audioBuffer  = { cur: new AudioBuffer(this.model.bufferLength, this.model.bufferNumberOfChannels, this), old: null };
    this.audioBufferSource = null;
    // Altro?
  }

  startRecord() {
    this.stop();
    this.flags.play = false;

    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.rec = new MediaRecorder(stream); // TODO: MIME type?
        this.rec.start();

        this.flags.rec = true;

        this.rec.ondataavailable = e => this.chunks.push(e.data);

        this.rec.onstop = async () => {
          this.flags.rec = false;

          const arrayBuffer = await this.chunks[0].arrayBuffer();
          this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
          // TODO: attualmente il blob diventa il nuovo buffer, ma bisogna fare il mix con quello vecchio (si può usare come appoggio per mantenere i vecchi dati il buffer "old")

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

          // TODO: decidere se spostare la chiamata e delegarla alla view (in tal caso, gestire l'asincronicità di stopRecord e play)
          this.play();
        };
      });
  }

  stopRecord() {
    this.rec?.stop();
  }

  undo() {
    this.stop();
    this.audioBuffer = { cur: this.audioBuffer.old, old: this.audioBuffer.old }; // TODO: attualmente un solo buffer, aggiungere il secondo
    this.play();
  }
}

export { Player };
