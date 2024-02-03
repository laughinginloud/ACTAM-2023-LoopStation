class EditModeHandler {
  model;
  manopolone;
  manopolino;

  currentChannel;

  index;
  selectEffect; // 0: selEffect, 1: selParam, 2: null
  currEff;
  currChanCh;

  effKeys;
  paramKeys;

  textbox;

  constructor(model, manopole) {
    this.model = model;

    this.manopolone = manopole.manopolone;
    this.manopolino = manopole.manopolino;

    this.currentChannel = null;

    this.effKeys   = Object.keys(this.model.effects);
    this.paramKeys = new Array();

    for (const key of this.effKeys)
      this.paramKeys.push(Object.keys(this.model.effects[key]).concat("Remove effect"));

    this.index        = 0;
    this.selectEffect = 2;
    this.currEff      = { 'A': null, 'B': null, 'C': null };
    this.currChanCh   = null;

    document.getElementById("clear_last").addEventListener("click", this.clearLastHandler);
    document.getElementById("next")      .addEventListener("click", this.nextHandler);
    document.getElementById("previous")  .addEventListener("click", this.prevHandler);
    document.getElementById("select")    .addEventListener("click", this.selHandler);

    for (const c of ['A', 'B', 'C'])
      document.getElementById("eff" + c).addEventListener("click", () => this.effButtonHandler(c));

    this.manopolino.addEventListener("drag", this.manopolinoHandler);
    this.manopolone.addEventListener("drag", this.manopoloneHandler);

    this.textbox = document.getElementById("control_panel");
  }

  enableModeHandler = target => {
    this.currentChannel?.disableEditMode();
    this.currentChannel = target;

    for (const eff of ['A', 'B', 'C'])
      document.getElementById("eff" + eff).classList.remove("modifica");

    this.selectEffect = 2;

    if (target) {
      document.getElementById("effA")      .removeAttribute("disabled");
      document.getElementById("effB")      .removeAttribute("disabled");
      document.getElementById("effC")      .removeAttribute("disabled");
      document.getElementById("clear_last").removeAttribute("disabled");

      this.manopolone.enable();
      this.manopolino.enable();

      for (const eff of ['A', 'B', 'C'])
        if (this.currentChannel.channel.effects[eff] != null)
          document.getElementById("eff" + eff).classList.add("modifica");
    }

    else {
      document.getElementById("effA")      .setAttribute("disabled", "disabled");
      document.getElementById("effB")      .setAttribute("disabled", "disabled");
      document.getElementById("effC")      .setAttribute("disabled", "disabled");
      document.getElementById("clear_last").setAttribute("disabled", "disabled");

      this.manopolone.disable();
      this.manopolino.disable();

      this.textbox.value = "Loop Station\nRC-SOS";
    }
  }

  clearLastHandler = () => {
    if (this.currentChannel?.channel.player.undoable) {
      this.currentChannel.channel.player.undo();

      document.getElementById("clear_last").classList.toggle("modifica");
      setTimeout(() => document.getElementById("clear_last").classList.toggle("modifica"), 500);
    }
  }

  effButtonHandler = btn => {
    if (this.currentChannel == null)
      return;

    if (this.currChanCh && this.currentChannel.channel.effects[this.currChanCh] == null)
      document.getElementById("eff" + this.currChanCh).classList.remove("modifica");

    document.getElementById("eff" + btn).classList.add("modifica");

    this.currChanCh = btn;

    if (this.currentChannel.channel.effects[this.currChanCh] == null) {
      this.selectEffect = 0;
      this.index = 0;
      this.printEffectName(this.effKeys[this.index]);
    }

    else {
      this.selectEffect = 1;
      this.index = 0;
      this.printEffectParam(this.paramKeys[this.currEff[this.currChanCh]][this.index]);
    }
  }

  nextHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      this.index = (this.index + 1) % this.effKeys.length;
      this.printEffectName(this.effKeys[this.index]);
    }

    else if (this.selectEffect == 1) {
      this.index = (this.index + 1) % this.paramKeys[this.currEff[this.currChanCh]].length;
      this.printEffectParam(this.paramKeys[this.currEff[this.currChanCh]][this.index]);
    }
  }

  prevHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      // NOTA: non rimuovere "+ this.effKeys.length" (% è il resto, non il modulo)
      this.index = (this.index + this.effKeys.length - 1) % this.effKeys.length;
      this.printEffectName(this.effKeys[this.index]);
    }

    else if (this.selectEffect == 1) {
      // NOTA: non rimuovere "+ this.paramKeys[this.currEff].length" (% è il resto, non il modulo)
      this.index = (this.index + this.paramKeys[this.currEff[this.currChanCh]].length - 1) % this.paramKeys[this.currEff[this.currChanCh]].length;
      this.printEffectParam(this.paramKeys[this.currEff[this.currChanCh]][this.index]);
    }
  }

  selHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      this.currentChannel.channel.setEffect(this.currChanCh, effectFactory(this.effKeys[this.index], this.model));

      this.selectEffect = 1;
      this.currEff[this.currChanCh] = this.index;

      this.index = 0;

      // Mostrare i valori associati alla chiave selezionata
      this.printEffectParam(this.paramKeys[this.currEff[this.currChanCh]][this.index]);
    }

    else if (this.selectEffect == 1 && this.paramKeys[this.currEff[this.currChanCh]][this.index] == "Remove effect") {
      this.currentChannel.channel.removeEffect(this.currChanCh);

      this.selectEffect = 0;
      this.currEff[this.currChanCh] = null;

      this.index = 0;

      this.printEffectName(this.effKeys[this.index]);
    }

    this.currentChannel.notifyPlay();
  }

  printEffectName = eff => {
    this.textbox.value = 'Channel ' + this.currChanCh + '\n' + eff;
  }

  printEffectParam = (param, value) => {
    this.textbox.value = 'Channel ' + this.currChanCh + " - " + this.effKeys[this.currEff[this.currChanCh]] + '\n' + param + (value != undefined && value != null ? ('\n' + value) : '');
  }

  manopolinoHandler = () => {
    if (this.selectEffect != 1 || this.paramKeys[this.currEff[this.currChanCh]][this.index] == "Remove effect")
      return;

    const kr = knobRange(this.manopolino.rotation, this.model.effects[this.effKeys[this.currEff[this.currChanCh]]][this.paramKeys[this.currEff[this.currChanCh]][this.index]].type);
    this.printEffectParam(this.paramKeys[this.currEff[this.currChanCh]][this.index], kr.repr);
    this.currentChannel.channel.effects[this.currChanCh].modifyParam(kr.val, this.paramKeys[this.currEff[this.currChanCh]][this.index]);
  }

  manopoloneHandler = () => {
    if (this.selectEffect != 1 || this.paramKeys[this.currEff[this.currChanCh]][this.index] == "Remove effect")
      return;

    const param = this.currentChannel.channel.effects[this.currChanCh].getMainParam();
    const kr = knobRange(this.manopolone.rotation, this.model.effects[this.effKeys[this.currEff[this.currChanCh]]][param].type);
    this.printEffectParam(param, kr.repr);
    this.currentChannel.channel.effects[this.currChanCh].modifyMainParam(kr.val);
    this.index = this.paramKeys[this.currEff[this.currChanCh]].indexOf(param);
  }
}

import { effectFactory, knobRange } from "../Controller/effect";

export { EditModeHandler }
