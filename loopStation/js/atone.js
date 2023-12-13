import * as Tone from "tone";

function initTone(audioContext) {
  Tone.setContext(audioContext);
}

export { initTone };
