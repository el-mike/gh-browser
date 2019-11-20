export class LoadButton {
  constructor(element) {
    this.element = element;
  }

  on(event, callback) {
    this.element.on(event, callback);
  }
}
