// @ts-nocheck
class Model {
  numChannels;
  bufferLength;
  bufferNumberOfChannels;
  bufferSampleRate;
  firstRecord;

  constructor() {
    this.numChannels            = 5;
    this.bufferLength           = 256;
    this.bufferNumberOfChannels = 2;
    this.bufferSampleRate       = 44100;

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

  // TODO: controllare gli estremi dei range per ogni effetto
  effects = {
    "Chorus": {
      "Frequency": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
      },
      "Delay time": {
        value: 10,
        type:  "ms",
        min:   10,
        max:   100,
        step:  1
      },
      "Depth": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: 80,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    // Freeverb
    "Reverb": {
      "Room size": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Dampening": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
      },
      "Level": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    // FeedbackDelay
    "Delay": {
      "Time": {
        value: 10,
        type:  "ms",
        min:   10,
        max:   100,
        step:  1
      },
      "Feedback": {
        value: 0,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    "Vibrato": {
      "Frequency": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
      },
      "Depth": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    "Tremolo": {
      "Frequency": {
        value: 0.1,
        type:  "hz",
        min:   0.1,
        max:   10,
        step:  0.01
      },
      "Depth": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      },
      "Level": {
        value: 50,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    "Pitch shift": {
      "Pitch": {
        value: 12,
        type:  "st",
        min:   -24,
        max:   24,
        step:  1
      },
      "Level": {
        value: 100,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    // BiquadFilterNode
    "Highpass filter": {
      "Cutoff": {
        value: 20,
        type:  "cutoff",
        min:   20,
        max:   22000,
        step:  1
      },
      "Resonance": {
        value: 0,
        type:  "percent",
        min:   0,
        max:   100,
        step:  1
      }
    },

    // BiquadFilterNode
    "Lowpass filter": {
      "Cutoff": {
        value: 22000,
        type:  "cutoff",
        min:   20,
        max:   22000,
        step:  1
      },
      "Resonance": {
        value: 0,
        type:  "q",
        min:   0,
        max:   3.4 * (10**38),
        step:  1
      }
    },

    "Compressor": {
      "Threshold": {
        value: -100,
        type:  "dB",
        min:   -100,
        max:   0,
        step:  1
      },
      "Ratio": {
        value: 1,
        type:  "nat", // Alias di percent? Oppure range differente?
        min:   1,
        max:   20,
        step:  1
      }
    }
  }
}

export { Model };
