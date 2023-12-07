class EditModeHandler {
  currentChannel;

  // TODO: disabilitare i pulsanti dei canali se in edit mode?

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
