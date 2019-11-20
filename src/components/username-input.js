import { validateUsername } from '../validation';

export class UsernameInput {
  constructor(element) {
    this.element = element;
    this.valid = false;
  }

  init() {
    this.element.on('keyup blur', () => this.validate());
  }

  getValue() {
    return this.element.val();
  }

  validate() {
    this.valid = validateUsername(this.getValue());

    this.element.toggleClass('is-danger', !this.valid);
  }
}
