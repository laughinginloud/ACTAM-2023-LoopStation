class View {
  model;
  controller;

  topBar;
  channels;
  editMode;

  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.editMode = new EditModeHandler();

    this.channels = new Array(this.model.numChannels);

    for (let i = 0; i < this.model.numChannels; ++i) {
      this.channels[i] = new ChannelHandler(controller.channels[i], i + 1, this.editMode);
    }

    this.topBar = new TopBarHandler(this.controller, this.channels);

    for (const ch of this.channels)
      ch.registerTopBarHandler(this.topBar);
  }
}

import { ChannelHandler }  from "./ChannelHandler.js"
import { EditModeHandler } from "./EditModeHandler.js";
import { TopBarHandler }   from "./TopBarHandler.js";

export { View, ChannelHandler, EditModeHandler, TopBarHandler };
