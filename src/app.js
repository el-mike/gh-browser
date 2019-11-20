import './assets/scss/app.scss';
import $ from 'cash-dom';

import {
  UsernameInput,
  LoadButton,
} from './components';

const selectors = {
  LOAD_USERNAME: '.load-username',
  USERNAME_INPUT: '.username.input',
  PROFILE_NAME: '#profile-name',
  PROFILE_IMAGE: '#profile-image',
  PROFILE_URL: '#profile-url',
  PROFILE_BIO: '#profile-bio'
};

export class App {
  initializeApp() {
    this.usernameInput = new UsernameInput($(selectors.USERNAME_INPUT));
    this.loadButton = new LoadButton($(selectors.LOAD_USERNAME));

    this.usernameInput.init();

    this.loadButton.on('click', () => {
      /**
       * Additional validation - username input is validated on keyup and blur,
       * but user can hit load button without typing anything, therefore we need to fire
       * validation also on load button click.
       */
      this.usernameInput.validate();

      if (!this.usernameInput.valid) {
        return;
      }

      fetch(`https://api.github.com/users/${this.usernameInput.getValue()}`)
        .then(response => response.json())
        .then(body => {
          this.profile = body;
          this.updateProfile();
        });
    });
  }

  updateProfile() {
    $(selectors.PROFILE_NAME).text($(selectors.USERNAME_INPUT).val());
    $(selectors.PROFILE_IMAGE).attr('src', this.profile.avatar_url);
    $(selectors.PROFILE_URL).attr('href', this.profile.html_url).text(this.profile.login);
    $(selectors.PROFILE_BIO).text(this.profile.bio || '(no information)');
  }
}
