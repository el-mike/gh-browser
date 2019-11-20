import './assets/scss/app.scss';
import $ from 'cash-dom';

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
    $(selectors.LOAD_USERNAME).on('click', () => {
      const userName = $(selectors.USERNAME_INPUT).val();

      fetch(`https://api.github.com/users/${userName}`)
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
