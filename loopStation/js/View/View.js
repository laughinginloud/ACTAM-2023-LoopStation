class View {
  model;
  controller;

  topBar;
  channels;

  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.channels = new Array(this.model.numChannels);

    for (let i = 0; i < this.model.numChannels; ++i) {
      this.channels[i] = new ChannelHandler(controller.channels[i], i + 1);
    }

    this.topBar = new TopBarHandler(this.controller, this.channels);
  }
}

import { ChannelHandler } from "./ChannelHandler.js"
import { TopBarHandler } from "./TopBarHandler.js";

export { View, ChannelHandler, TopBarHandler };
