import { initGui } from "./gui"
import { Model } from "./Model/Model";
import { Controller, Channel, Player } from "./Controller/Controller";
import { View, ChannelHandler, TopBarHandler } from "./View/View";

import * as Tone from "tone";

//{
  initGui();

  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);
//}
