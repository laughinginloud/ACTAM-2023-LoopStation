// @ts-ignore
import filterUrl from "worklet:./Filter.js";

import { Delay } from "./Delay";

function initEffects(audioContext) {
  audioContext.audioWorklet.addModule(filterUrl);
}

function effectFactory(effect, model) {
  switch (effect) {
    case "Delay": return new Delay(model);
    // TODO: resto degli effetti
  }
}

export { initEffects, effectFactory };
