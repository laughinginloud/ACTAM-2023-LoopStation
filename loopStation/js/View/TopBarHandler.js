class TopBarHandler {
  controller;
  channels;

  constructor(controller, channels) {
    this.controller = controller;
    this.channels   = channels;

    document.getElementById("global_clear").addEventListener("click", this.clearHandler);
    document.getElementById("global_sp").addEventListener("click", this.playPauseHandler);
  }

  clearHandler = () => {
    for (const ch of this.channels)
      ch.clearHandler();
  }

  playPauseHandler = () => {
    let stop = false;

    for (const ch of this.channels) {
      if (ch.channel.player.flags.play || ch.channel.player.flags.rec) {
        stop = true;
        break;
      }
    }

    if (stop)
      for (const ch of this.channels) {
        ch.channel.player.stop();

        if (!ch.channel.player.flags.play)
          document.getElementById("sp" + ch.channelIndex).classList.remove("modifica");
      }

    else
      for (const ch of this.channels) {
        ch.channel.player.play();

        if (ch.channel.player.flags.play)
          document.getElementById("sp" + ch.channelIndex).classList.add("modifica");
      }
  }
}

export { TopBarHandler };
