class EditModeHandler {
  currentChannel;

  // TODO: disabilitare il record del canale se in modalità edit
  // TODO: disabilitare i pulsanti degli effetti se non in edit mode

  constructor() {
    this.currentChannel = null;

    document.getElementById("clear_last").addEventListener("click", this.clearLastHandler);
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
}

export { EditModeHandler }
