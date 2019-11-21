export class Hideable {
  constructor(element) {
    this.element = element;
  }

  toggleVisibility(show) {
    this.element.toggleClass('is-hidden', !show);
  }
}
