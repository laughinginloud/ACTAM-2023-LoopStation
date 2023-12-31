class TopBarHandler {
  controller;
  channels;

  playing;

  constructor(controller, channels) {
    this.controller = controller;
    this.channels   = channels;

    this.playing = new Array(channels.length).fill(false);

    document.getElementById("global_clear").addEventListener("click", this.clearButtonHandler);
    document.getElementById("global_sp")   .addEventListener("click", this.playPauseHandler);
  }

  clearButtonHandler = () => {
    for (const ch of this.channels)
      ch.clearButtonHandler();
  }

  playPauseHandler = () => {
    if (this.channels.some(ch => ch.channel.player.flags.play || ch.channel.player.flags.rec)) {
      document.getElementById("global_sp").classList.remove("modifica");

      for (const ch of this.channels) {
        ch.channel.player.stop();

        if (!ch.channel.player.flags.play)
          document.getElementById("sp" + ch.channelIndex).classList.remove("modifica");
      }

      for (let idx = 0; idx < this.playing.length; ++idx)
        this.playing[idx] = false;
    }

    else {
      for (let idx = 0; idx < this.playing.length; ++idx) {
        this.channels[idx].channel.player.play();

        if (this.channels[idx].channel.player.flags.play) {
          document.getElementById("sp" + (idx + 1)).classList.add("modifica");
          this.playing[idx] = true;

          document.getElementById("global_sp").classList.add("modifica");
        }
      }
    }
  }

  notifyPlay = index => {
    this.playing[index - 1] = true;
    document.getElementById("global_sp").classList.add("modifica");
  }

  notifyPause = index => {
    this.playing[index - 1] = false;

    if (!this.playing.some(Boolean))
      document.getElementById("global_sp").classList.remove("modifica");
  }
}

export { TopBarHandler };
