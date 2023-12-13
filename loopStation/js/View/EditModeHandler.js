class EditModeHandler {
  model;
  manopolone;
  manopolino;

  currentChannel;

  // TODO: disabilitare il record del canale se in modalità edit
  // TODO: disabilitare i pulsanti degli effetti se non in edit mode

  constructor(model, manopole) {
    this.model = model;

    this.manopolone = manopole[0];
    this.manopolino = manopole[1];

    this.currentChannel = null;

    this.effKeys = Object.keys(this.model.effects);
    this.paramKeys = Object.keys(this.model.effects.Chorus);
    this.index = 0;
    this.selectEffect = 0; //0:selEffect, 1:selParam, 2:null

    document.getElementById("clear_last").addEventListener("click", this.clearLastHandler);
    document.getElementById("effA").addEventListener("click", this.pippo);
    document.getElementById("next").addEventListener("click", this.nextHandler);
    document.getElementById("previous").addEventListener("click", this.prevHandler);
    document.getElementById("select").addEventListener("click", this.selHandler);

    this.manopolino.addEventListener("drag", this.manopolinoHandler);
    this.manopolone.addEventListener("drag", this.manopoloneHandler);

    this.textbox = document.getElementById("control_panel");
  }

  enableModeHandler = target => {
    this.currentChannel?.disableEditMode();
    this.currentChannel = target;
  }

  clearLastHandler = () => {
    if (this.currentChannel) {
      this.currentChannel.channel.player.undo();
    }
  }

  pippo = () => {
    if (this.currentChannel == null)
      return;

    this.textbox.value = this.effKeys[this.index];
  }

  nextHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      this.index = (this.index + 1) % this.effKeys.length;
      this.textbox.value = this.effKeys[this.index];
    }

    else if (this.selectEffect == 1) {
      this.index = (this.index + 1) % this.paramKeys.length;
      this.textbox.value = this.paramKeys[this.index];
    }
  }

  prevHandler = () => {
    if (this.currentChannel == null)
      return;

    if (this.selectEffect == 0) {
      this.index = (this.index - 1) % this.effKeys.length;
      this.textbox.value = this.effKeys[this.index];
    }

    else if (this.selectEffect == 1) {
      this.index = (this.index - 1) % this.paramKeys.length;
      this.textbox.value = this.paramKeys[this.index];
    }
  }

  selHandler = () => {
    if (this.currentChannel == null)
      return;

    this.selectEffect = 1;

    // Mostrare i valori associati alla chiave selezionata
    this.textbox.value = this.paramKeys[this.index];

    // TODO: illuminazione pulsante effetto
  }

  printEffect = value => {
    this.textbox.value = this.paramKeys[this.index] + '\n\n' + value;
  }

  // TODO: handler manopolino, che richiama printEffect

  manopolinoHandler = () => {
    const rotation_ina = Math.round((this.manopolino.rotation + 135) / 2.7);
    this.printEffect(rotation_ina);
  }

  manopoloneHandler = () => {
    const rotation_one = Math.round((this.manopolone.rotation + 135) / 2.7);
  }
}

export { EditModeHandler }
