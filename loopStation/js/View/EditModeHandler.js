class EditModeHandler {
  model;
  manopolone;
  manopolino;

  currentChannel;

  // TODO: disabilitare il record del canale se in modalità edit
  // TODO: disabilitare i pulsanti degli effetti se non in edit mode

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

    // TODO: aggiungere rimozione dell'effetto in fondo alla catena
    for (const key of this.effKeys)
      this.paramKeys.push(Object.keys(this.model.effects[key]));

    this.index        = 0;
    this.selectEffect = 2; //TODO: enum? se sì, come?
    this.currEff      = null;
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

      for (const eff of ['A', 'B', 'C'])
        if (this.currentChannel.channel.effects[eff] != null)
          document.getElementById("eff" + eff).classList.add("modifica");
    }

    else {
      document.getElementById("effA")      .setAttribute("disabled", "disabled");
      document.getElementById("effB")      .setAttribute("disabled", "disabled");
      document.getElementById("effC")      .setAttribute("disabled", "disabled");
      document.getElementById("clear_last").setAttribute("disabled", "disabled");
    }
  }

  clearLastHandler = () => {
    if (this.currentChannel) {
      this.currentChannel.channel.player.undo();
    }
  }

  effButtonHandler = btn => {
    if (this.currentChannel == null)
      return;

    if (this.currChanCh && this.currentChannel.channel.effects[this.currChanCh] == null)
      document.getElementById("eff" + this.currChanCh).classList.remove("modifica");

    document.getElementById("eff" + btn).classList.add("modifica");

    this.currChanCh = btn;
    this.selectEffect = 0;
    this.index = 0;
    this.printEffectName(this.effKeys[this.index]);
  }

  nextHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      this.index = (this.index + 1) % this.effKeys.length;
      this.printEffectName(this.effKeys[this.index]);
    }

    else if (this.selectEffect == 1) {
      this.index = (this.index + 1) % this.paramKeys[this.currEff].length;
      this.printEffectParam(this.paramKeys[this.currEff][this.index]);
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
      this.index = (this.index + this.paramKeys[this.currEff].length - 1) % this.paramKeys[this.currEff].length;
      this.printEffectParam(this.paramKeys[this.currEff][this.index]);
    }
  }

  selHandler = () => {
    if (this.currentChannel == null)
      return;

    this.currentChannel.channel.setEffect(this.currChanCh, effectFactory(this.effKeys[this.index], this.model));

    this.selectEffect = 1;
    this.currEff = this.index;

    this.index = 0;

    // Mostrare i valori associati alla chiave selezionata
    this.printEffectParam(this.paramKeys[this.currEff][this.index]);

    // TODO: illuminazione pulsante effetto
  }

  printEffectName = eff => {
    this.textbox.value = 'Channel ' + this.currChanCh + '\n' + eff;
  }

  printEffectParam = (eff, value) => {
    this.textbox.value = 'Channel ' + this.currChanCh + '\n' + eff + (value != undefined && value != null ? ('\n' + value) : '');
  }

  // TODO: handler manopolino, che richiama printEffectParam

  manopolinoHandler = () => {
    const rotation_ina = Math.round((this.manopolino.rotation + 135) / 2.7);
    this.printEffectParam(this.paramKeys[this.currEff][this.index], rotation_ina);
  }

  manopoloneHandler = () => {
    const rotation_one = Math.round((this.manopolone.rotation + 135) / 2.7);
  }
}

import { effectFactory } from "../Controller/effect";

export { EditModeHandler }
