class ChannelHandler {
  channel;
  flags;
  recordPlayButton;

  constructor(channel, index) {
    this.channel = channel;
    this.flags   = channel.player.flags;

    document.getElementById("rec" + index).addEventListener("click", this.recordPlayButtonHandler);
    document.getElementById("vol" + index).children[0].addEventListener("input", () =>
      channel.changeGain(Number(document.getElementById("vol" + index).children[0].value) / 100))
  }

  recordPlayButtonHandler = () => {
    if (this.flags.rec)
      this.channel.player.stopRecord();

    else
      this.channel.player.startRecord(this.channel.player.play);
  }
}

export { ChannelHandler };
