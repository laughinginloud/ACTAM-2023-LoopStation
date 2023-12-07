class ChannelHandler {
  channel;
  flags;
  recordPlayButton;

  channelIndex;

  editMode;
  editModeHandler;

  constructor(channel, index, editModeHandler) {
    this.channel      = channel;
    this.flags        = channel.player.flags;
    this.channelIndex = index;

    this.editMode        = false;
    this.editModeHandler = editModeHandler;

    document.getElementById("rec" + index).addEventListener("click", this.recordPlayButtonHandler);
    document.getElementById("vol" + index).children[0].addEventListener("input", this.gainHandler);
    document.getElementById("sp" + index).addEventListener("click", this.playPauseButtonHandler);
    document.getElementById("clear" + index).addEventListener("click", this.clearButtonHandler);
    document.getElementById("ed" + index).addEventListener("click", this.editButtonHandler);
  }

  recordPlayButtonHandler = () => {
    if (this.flags.rec) {
      this.channel.player.stopRecord();
      document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    }

    else {
      this.channel.player.startRecord(this.channel.player.play);
      document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
    }
  }

  gainHandler = () => {
    // @ts-ignore
    this.channel.changeGain(Number(document.getElementById("vol" + this.channelIndex).children[0].value) / 100)
  }

  playPauseButtonHandler = () => {
    if (this.flags.rec) {
      this.channel.player.stopRecord();
      document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    }

    else if (this.flags.play) {
      this.channel.player.pause();
      document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
    }

    else if (!this.flags.play) {
      this.channel.player.play();

      if (this.flags.play)
        document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    }
  }

  clearButtonHandler = () => {
    this.channel.player.clean();
    document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
  }

  editButtonHandler = () => {
    this.channel.player.stop();

    this.editMode = !this.editMode;

    if (this.editMode) {
      document.getElementById("ed" + this.channelIndex).classList.add("modifica");
      this.editModeHandler.enableModeHandler(this);
    }

    else {
      document.getElementById("ed" + this.channelIndex).classList.remove("modifica");
      this.editModeHandler.enableModeHandler(null);
    }
  }

  disableEditMode = () => {
    this.editMode = false;
    document.getElementById("ed" + this.channelIndex).classList.remove("modifica");
  }
}

export { ChannelHandler };
