class View {
  model;
  controller;

  topBar;
  channel;

  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.topBar = new TopBarHandler(this.controller);

    this.channel = new Array(this.model.numChannels);

    for (let i = 0; i < this.model.numChannels; ++i) {
      this.channel[i] = new ChannelHandler(controller.channels[i], i + 1);
    }
  }
}

import { ChannelHandler } from "./ChannelHandler.js"
import { TopBarHandler } from "./TopBarHandler.js";

export { View, ChannelHandler, TopBarHandler };
