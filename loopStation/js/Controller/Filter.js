//// @ts-ignore
//class Filter extends AudioWorkletProcessor {
//  // BiquadFilterNode, IIRFilterNode
//
//  type;
//  rate;
//  depth;
//  resonance;
//  cutoff;
//
//  filter;
//
//  //constructor(audioContext) {
//  //  super(audioContext);
////
//  //  this.filter = new BiquadFilterNode(audioContext);
////
//  //  this.filter.Q.value = 1;
//  //  this.filter.type = "lowpass";
//  //  this.filter.frequency.value = 22000;
//  //}
//
//  //constructor(audioContext) {
//  //  super(audioContext);
//  //
//  //  this.type      = "lowpass";
//  //  this.rate      = new Number(0);
//  //  this.depth     = new Number(0);
//  //  this.resonance = new Number(0);
//  //  this.cutoff    = new Number(2000);
//  //
//  //  super["mainParam"] = { "Cutoff": this.cutoff };
//  //  super["params"] = {
//  //    "Type":      this.type,
//  //    "Rate":      this.rate,
//  //    "Depth":     this.depth,
//  //    "Resonance": this.resonance,
//  //    "Cutoff":    this.cutoff
//  //  };
//  //
//  //  super["processor"] = new BiquadFilterNode(audioContext, {
//  //    type: this.type,
//  //    q: this.resonance,
//  //    frequency: this.cutoff
//  //  });
//  //}
//
//  process(input, output, parameters) {
//    // TODO: filtro
//
//    for (let i = 0; i < input.length; ++i)
//      output[0][0][i] = Math.round(input[0][0][i]);
//  }
//}

// TODO: rendere un filtro, attualmente è un generatore di rumore bianco
class Filter extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    // take the first output
    const output = outputs[0];
    // fill each channel with random values multiplied by gain
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // generate random value for each sample
        // Math.random range is [0; 1); we need [-1; 1]
        // this won't include exact 1 but is fine for now for simplicity
        channel[i] =
          (Math.random() * 2 - 1) *
          // the array can contain 1 or 128 values
          // depending on if the automation is present
          // and if the automation rate is k-rate or a-rate
          (parameters["customGain"].length > 1
            ? parameters["customGain"][i]
            : parameters["customGain"][0]);
      }
    });
    // as this is a source node which generates its own output,
    // we return true so it won't accidentally get garbage-collected
    // if we don't have any references to it in the main thread
    return false;
  }
  // define the customGain parameter used in process method
  static get parameterDescriptors() {
    return [
      {
        name: "customGain",
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }
}


// @ts-ignore
registerProcessor('Filter', Filter);

//import { Effect } from "./Effect";
//export { Filter };
