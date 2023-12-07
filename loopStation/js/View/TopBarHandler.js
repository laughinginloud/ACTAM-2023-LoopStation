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
      if (ch.player.flags.play || ch.player.flags.rec) {
        stop = true;
        break;
      }
    }

    if (stop)
      for (const ch of this.channels)
        ch.player.stop();

    else
      for (const ch of this.channels)
        ch.player.play();
  }
}

export { TopBarHandler };
