class Model {
  numChannels = 5;

  bufferLength = 256;
  bufferNumberOfChannels = 2;
  bufferSampleRate = 44100;
  firstRecord;

  constructor() {
    this.firstRecord = new Array(this.numChannels);

    for (let i = 0; i < this.numChannels; ++i)
      this.firstRecord[i] = true;
  }

  getBufferOptions = () => {
    return {
      length: this.bufferLength,
      numberOfChannels: this.bufferNumberOfChannels,
      sampleRate: this.bufferSampleRate
    };
  }

  //setBufferLength = length => {
  //  this.bufferLength = length;
  //  this.firstRecord = false;
  //}
}

export { Model };
