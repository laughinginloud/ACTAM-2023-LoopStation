class Delay extends Effect {
  time;
  feedback;
  level;

  constructor() {
    super();

    this.time     = new Number(0);
    this.feedback = new Number(0);
    this.level    = new Number(0);

    super["mainParam"] = { "Level": this.level };
    super["params"] = {
      "Time":     this.time,
      "Feedback": this.feedback,
      "Level":    this.level
    };

    super["processor"] = new AudioWorkletProcessor(this.handler);
  }

  handler = () => {
    // TODO: delay
  }
}
