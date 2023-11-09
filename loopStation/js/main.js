import { Model } from "./Model/Model.js";
import { Controller, Channel, Player } from "./Controller/Controller.js";
import { View, ChannelHandler, TopBarHandler } from "./View/View.js";

{
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);

 // init vari
}
