class Player {
  audioContext;
  /**
   * @type {{ cur: AudioBuffer; old: AudioBuffer; }}
   */
  audioBuffer;
  model;
  channel;
  channelHandler;

  /**
   * @type AudioBufferSourceNode
   */
  audioBufferSource;

  /**
   * @type MediaRecorder
   */
  rec;     // TODO: Rename me, please!
  chunks;  // TODO: Rename me, please!

  timeoutId;

  undoable; // TODO: Rename me, please!

  flags;

  startTime;
  pauseTime;

  index;

  compressor;

  constructor(audioContext, model, channel, index) {
    this.audioContext = audioContext;
    this.model = model;

    this.channelHandler = null;

    this.rec = null;
    this.chunks = [];

    this.timeoutId = null;

    this.audioBuffer = { cur: null, old: null };
    this.audioBufferSource = null;

    this.undoable = false;

    this.channel = channel;

    this.flags = {
      play: false,
      rec: false
    }

    this.startTime = 0;
    this.pauseTime = 0;

    this.index = index;

    this.compressor = new DynamicsCompressorNode(audioContext);
  }

  play = () => {
    this.stop();
    // Causa null-check: pressione undo quando il canale è vuoto
    if (this.audioBuffer.cur) {
      this.audioBufferSource = this.audioContext.createBufferSource();
      this.audioBufferSource.buffer = this.audioBuffer.cur;
      this.audioBufferSource.playbackRate.value = 1;
      this.audioBufferSource.loop = true;
      this.channel.connectPlayer(this.audioBufferSource);
      this.channel.changeGain(Number(document.getElementById("points" + (this.index + 1)).value) / 100);
      this.audioBufferSource.start(0, this.pauseTime);
      this.startTime  = this.audioContext.currentTime - this.pauseTime;
      this.pauseTime  = 0;
      this.flags.play = true;
    }
  }

  pause = () => {
    this.flags.play = false;
    this.pauseTime  = (this.audioContext.currentTime - this.startTime) % this.audioBuffer.cur?.duration;

    this.audioBufferSource?.stop();
  }

  stop = () => {
    this.stopRecord();

    this.flags.play = false;

    this.audioBufferSource?.stop();
    this.audioBufferSource = null;

    this.rewind();
  }

  rewind = () => {
    this.startTime = 0;
    this.pauseTime = 0;
  }

  clean = () => {
    this.stop();
    this.audioBuffer = { cur: null, old: null };
    this.audioBufferSource = null;
    this.undoable = false;
    this.model.firstRecord[this.index] = true;
  }

  startRecord = playBuffer => {
    this.rewind();
    this.play();
    this.flags.play = true;
    //this.stop();
    this.flags.play = false;

    if (!this.model.firstRecord[this.index])
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;
        this.flags.rec = false;
        this.rec.stop();
        this.channelHandler.notifyStopRecord();
      }, this.audioBuffer.cur.duration * 1000);

    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.rec = new MediaRecorder(stream);
        //this.rec = new MediaRecorder(stream, { mimeType: "audio/mpeg-3", audioBitrateMode: "constant", audioBitsPerSecond: 320 * 1024 });
        this.rec.start();

        this.flags.rec = true;

        this.rec.ondataavailable = e => this.chunks.push(e.data);

        this.rec.onstop = async () => {
          this.flags.rec = false;

          this.rewind();

          if (this.model.firstRecord[this.index]) {
            const arrayBuffer = await new Blob(this.chunks, { type: "audio/mpeg-3" }).arrayBuffer();
            this.audioBuffer.cur = await this.audioContext.decodeAudioData(arrayBuffer);
            this.model.firstRecord[this.index] = false;
          }

          else {
            this.audioBuffer.old = this.audioBuffer.cur;
            let prevRecordings = this.audioBuffer.cur;
            const arrayBuffer = await new Blob(this.chunks, { type: "audio/mpeg-3" }).arrayBuffer();
            this.audioBuffer.cur = await this.audioContext.decodeAudioData(arrayBuffer);
            this.audioBuffer.cur = this.overdub([prevRecordings, this.audioBuffer.cur]);
          }

          // TODO: stereo

          this.chunks = [];
          this.rec    = null;

          this.undoable = true;

          // Esegue il play del buffer solo se la funzione viene effettivamente passata come parametro
          playBuffer?.();
        };
      });
  }

  // TODO: play durante overdub
  overdub = buffers => {
    const n_buffer    = buffers.length;
    let   maxChannels = 0;              // Get the maximum number of channels across all buffers
    let   maxDuration = 0;              // Get the maximum length

    for (let i = 0; i < n_buffer; i++) {
        if (buffers[i].numberOfChannels > maxChannels) {  //TODO: i buffer che creiamo hanno solo un channel idk perché
            maxChannels = buffers[i].numberOfChannels;
        }
        if (buffers[i].duration > maxDuration) {
            maxDuration = buffers[i].duration;
        }
    }

    let mixed = this.audioContext.createBuffer(maxChannels, this.audioContext.sampleRate * maxDuration, this.audioContext.sampleRate);

    for (let j = 0; j < n_buffer; j++){
        // For each channel contained in a buffer...
        for (let ch = 0; ch < buffers[j].numberOfChannels; ch++) {
            let output = mixed.getChannelData(ch);                    // Get the channel we will mix into
            let input = buffers[j].getChannelData(ch);                // Get the channel we want to mix in

            for (let i = 0; i < input.length; i++)
                output[i] += input[i];                                // Calculate the new value for each index of the buffer array
        }
    }

    return mixed;
  }

  stopRecord = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.flags.play = false;

    this.audioBufferSource?.stop();
    this.audioBufferSource = null;

    this.rewind();

    this.rec?.stop();
  }

  undo = () => {
    if (this.undoable) {
      this.stop();
      this.audioBuffer = { cur: this.audioBuffer.old, old: null };
      this.play();

      this.undoable = false;

      if (this.audioBuffer.cur == null)
        this.model.firstRecord[this.index] = true;
    }
  }

  registerChannelHandler = channelHandler => {
    this.channelHandler = channelHandler;
  }
}

export { Player };
