class ChannelHandler {
  player;
  recording;
  recordPlayButton;

  constructor(player) {
    this.player = player;
    this.recording = false;

    document.getElementById("").addEventListener("click", this.recordPlayButtonHandler); // TODO: id elemento
  }

  recordPlayButtonHandler() {
    if (this.recording) {
      this.player.stopRecord();
      this.player.play();
    }

    else
      this.player.startRecord();
  }
}

export { ChannelHandler };
