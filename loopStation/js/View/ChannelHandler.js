class ChannelHandler {
  channel;
  flags;
  recordPlayButton;

  constructor(channel, index) {
    this.channel = channel;
    this.flags   = channel.player.flags;

    document.getElementById("rec" + index).addEventListener("click", this.recordPlayButtonHandler);
    document.getElementById("vol" + index).children[0].addEventListener("input", () => this.gainHandler(index));
    document.getElementById("sp" + index).addEventListener("click", this.playPauseButtonHandler);
    document.getElementById("clear" + index).addEventListener("click", this.clearHandler);
  }

  recordPlayButtonHandler = () => {
    if (this.flags.rec)
      this.channel.player.stopRecord();

    else
      this.channel.player.startRecord(this.channel.player.play);
  }

  gainHandler = index => {
    // @ts-ignore
    this.channel.changeGain(Number(document.getElementById("vol" + index).children[0].value) / 100)
  }

  playPauseButtonHandler = () => {
    if (this.flags.rec)
      this.channel.player.stopRecord();

    else if (this.flags.play)
      this.channel.player.pause();

    else if (!this.flags.play)
      this.channel.player.play();
  }

  clearHandler = () => {
    this.channel.player.clean();
  }
}

export { ChannelHandler };
