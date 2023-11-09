class Model {
  numChannels = 5;

  bufferLength = 256;
  bufferNumberOfChannels = 2;
  bufferSampleRate = 44100;

  constructor() {}

  getBufferOptions() {
    return {
      length: this.bufferLength,
      numberOfChannels: this.bufferNumberOfChannels,
      sampleRate: this.bufferSampleRate
    };
  }
}

export { Model };
