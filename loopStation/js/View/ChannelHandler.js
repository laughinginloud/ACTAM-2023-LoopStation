class ChannelHandler {
  channel;
  flags;
  recordPlayButton;

  channelIndex;

  constructor(channel, index) {
    this.channel      = channel;
    this.flags        = channel.player.flags;
    this.channelIndex = index;

    document.getElementById("rec" + index).addEventListener("click", this.recordPlayButtonHandler);
    document.getElementById("vol" + index).children[0].addEventListener("input", this.gainHandler);
    document.getElementById("sp" + index).addEventListener("click", this.playPauseButtonHandler);
    document.getElementById("clear" + index).addEventListener("click", this.clearHandler);
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
      document.getElementById("sp" + this.channelIndex).classList.add("modifica");
    }
  }

  clearHandler = () => {
    this.channel.player.clean();
    document.getElementById("sp" + this.channelIndex).classList.remove("modifica");
  }
}

export { ChannelHandler };
