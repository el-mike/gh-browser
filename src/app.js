import './assets/scss/app.scss';
import $ from 'cash-dom';

import {
  UsernameInput,
  LoadButton,
  Timeline,
} from './components';

const selectors = {
  LOAD_USERNAME: '.load-username',
  USERNAME_INPUT: '.username.input',
  PROFILE_NAME: '#profile-name',
  PROFILE_IMAGE: '#profile-image',
  PROFILE_URL: '#profile-url',
  PROFILE_BIO: '#profile-bio',
  TIMELINE: '#user-timeline',
};

export class App {
  constructor(
    config,
    githubService,
  ) {
    this.config = config;
    this.githubService = githubService;
  }

  initializeApp() {
    this.usernameInput = new UsernameInput($(selectors.USERNAME_INPUT));
    this.loadButton = new LoadButton($(selectors.LOAD_USERNAME));

    this.timeline = new Timeline($(selectors.TIMELINE));

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

      const username = this.usernameInput.getValue();

      /**
       * Those two requests could actually go in parallel, but it's specified in the task's
       * description, that the second request should be fired "After user data has been loaded".
       */
      this.githubService.getUser(username)
        .then(profile => this.profile = profile)
        .then(() => this.githubService.getUserEvents(username))
        .then(events => {
          this.updateProfile();

          this.timeline.render(
            events.filter(event => this.config.events.includes(event.type))
          )
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
