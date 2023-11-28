class Effect {
  processor;
  mainParam;
  params;

  constructor() {
    this.processor = null;
    this.mainParam = null;
    this.params    = null;
  }

  modifyMainParam(value) {
    this.mainParam = parseInt(value);
  }

  modifyParam(value, param) {
    this.params[param] = parseInt(value);
  }
}
