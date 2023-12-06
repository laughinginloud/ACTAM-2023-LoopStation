//class Effect extends AudioWorkletNode {
//  processor;
//  mainParam;
//  params;
//
//  //constructor(audioContext) {
//  //  super(audioContext);
//  //
//  //  this.processor = null;
//  //  this.mainParam = null;
//  //  this.params    = null;
//  //}
//
//  modifyMainParam(value) {
//    this.mainParam = parseInt(value);
//  }
//
//  modifyParam(value, param) {
//    this.params[param] = parseInt(value);
//  }
//
//  getNode = () {
//    return this.processor;
//  }
//
//  disconnect = () {
//    this.processor.disconnect();
//  }
//}

// @ts-ignore
import filterUrl from "worklet:./Filter.js";

function initEffects(audioContext) {
  audioContext.audioWorklet.addModule(filterUrl);
}

//export { Effect, initEffects };
export { initEffects };
