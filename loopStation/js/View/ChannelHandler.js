class ChannelHandler {
  channel;
  flags;
  recordPlayButton;

  channelIndex;

  topBarHandler;

  editMode;
  editModeHandler;

  constructor(channel, index, editModeHandler) {
    this.channel      = channel;
    this.flags        = channel.player.flags;
    this.channelIndex = index;

    this.topBarHandler = null;

    this.editMode        = false;
    this.editModeHandler = editModeHandler;

    document.getElementById("rec"    + index).addEventListener("click", this.recordPlayButtonHandler);
    document.getElementById("points" + index).addEventListener("input", this.gainHandler);
    document.getElementById("sp"     + index).addEventListener("click", this.playPauseButtonHandler);
    document.getElementById("clear"  + index).addEventListener("click", this.clearButtonHandler);
    document.getElementById("ed"     + index).addEventListener("click", this.editButtonHandler);
    document.getElementById("rewind" + index).addEventListener("click", this.rewindButtonHandler);
  }

  registerTopBarHandler = handler => {
    this.topBarHandler = handler;
  }

  recordPlayButtonHandler = () => {
    if (document.getElementById("rec" + this.channelIndex).attributes["disabled"])
      return;

    if (this.flags.rec) {
      this.channel.player.stopRecord();
      document.getElementById("rec" + this.channelIndex).classList.remove("recording_mode")

      document.getElementById("sp" + this.channelIndex).classList.add("modifica");
      this.topBarHandler.notifyPlay(this.channelIndex);
    }

    else {
      this.channel.player.startRecord(this.channel.player.play);
      document.getElementById("rec" + this.channelIndex).classList.add("recording_mode")

      document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
      this.topBarHandler.notifyPause(this.channelIndex);
    }
  }

  notifyStopRecord = () => {
    this.channel.player.stopRecord();
    document.getElementById("rec" + this.channelIndex).classList.remove("recording_mode")

    document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    this.topBarHandler.notifyPlay(this.channelIndex);
  }

  gainHandler = () => {
    // @ts-ignore
    this.channel.changeGain(Number(document.getElementById("points" + this.channelIndex).value) / 100)
  }

  playPauseButtonHandler = () => {
    if (this.flags.rec) {
      this.channel.player.stopRecord();
      document.getElementById("sp" + this.channelIndex).classList.add("modifica");

      this.topBarHandler.notifyPlay(this.channelIndex);
    }

    else if (this.flags.play) {
      this.channel.player.pause();
      document.getElementById("sp" + this.channelIndex).classList.remove("modifica");

      this.topBarHandler.notifyPause(this.channelIndex);
    }

    else if (!this.flags.play) {
      this.channel.player.play();

      if (this.flags.play) {
        document.getElementById("sp" + this.channelIndex).classList.add("modifica");

        this.topBarHandler.notifyPlay(this.channelIndex);
      }
    }
  }

  notifyPlay = () => {
    if (!this.flags.play)
      return;

    document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    this.topBarHandler.notifyPlay(this.channelIndex);
  }

  notifyPause = () => {
    if (this.flags.play)
      return;

    document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
    this.topBarHandler.notifyPause(this.channelIndex);
  }

  clearButtonHandler = () => {
    this.channel.player.clean();
    document.getElementById("sp" + this.channelIndex).classList.remove("modifica");

    this.topBarHandler.notifyPause(this.channelIndex);
  }

  editButtonHandler = () => {
    //this.channel.player.stop();

    this.editMode = !this.editMode;

    if (this.editMode) {
      document.getElementById("ed" + this.channelIndex).classList.add("modifica");
      this.editModeHandler.enableModeHandler(this);
      document.getElementById("rec" + this.channelIndex).setAttribute("disabled", "disabled");
    }

    else {
      document.getElementById("ed" + this.channelIndex).classList.remove("modifica");
      this.editModeHandler.enableModeHandler(null);
      document.getElementById("rec" + this.channelIndex).removeAttribute("disabled");
    }
  }

  disableEditMode = () => {
    this.editMode = false;
    document.getElementById("ed" + this.channelIndex).classList.remove("modifica");
    document.getElementById("rec" + this.channelIndex).removeAttribute("disabled");
  }

  rewindButtonHandler = () => {
    if (this.channel.player.flags.rec) {
      this.channel.player.stopRecord();
      this.channel.player.stop();
    }

    else if (this.channel.player.flags.play) {
      this.channel.player.stop();
      this.channel.player.play();
    }

    else
      this.channel.player.rewind();
  }
}

export { ChannelHandler };
