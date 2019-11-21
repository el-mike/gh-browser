import './assets/scss/app.scss';
import $ from 'cash-dom';

import {
  UsernameInput,
  LoadButton,
  Timeline,
  Profile,
  LoadingIndicator,
} from './components';

const selectors = {
  LOAD_USERNAME: '.load-username',
  USERNAME_INPUT: '.username.input',
  TIMELINE: '#user-timeline',
  PROFILE: '.profile',
  LOADING_INDICATOR: '.loader',
};

export class App {
  constructor(
    config,
    githubService,
  ) {
    this.config = config;
    this.githubService = githubService;

    this.loaded = false;
    this.loading = false;
  }

  initializeApp() {
    this.usernameInput = new UsernameInput($(selectors.USERNAME_INPUT));
    this.loadButton = new LoadButton($(selectors.LOAD_USERNAME));

    this.timeline = new Timeline($(selectors.TIMELINE));
    this.profile = new Profile($(selectors.PROFILE), $);
    this.loadingIndicator = new LoadingIndicator($(selectors.LOADING_INDICATOR));

    this.handleVisibility();

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

      this.loading = true;

      this.handleVisibility();

      const username = this.usernameInput.getValue();

      /**
       * Those two requests could actually go in parallel, but it's specified in the task's
       * description, that the second request should be fired "After user data has been loaded".
       */
      this.githubService.getUser(username)
        .then(profile => this.profile.updateProfile(profile))
        .then(() => this.githubService.getUserEvents(username))
        .then(events =>
          this.timeline.render(
            events.filter(event => this.config.events.includes(event.type))
          )
        )
        .finally(() => {
          this.loading = false;
          this.loaded = true;

          this.handleVisibility();
        })
        .catch(error => {
          console.error(error);

          this.loading = false;
          this.loaded = false;

          this.handleVisibility();
        });
    });
  }

  handleVisibility() {
    const showContent = this.loaded && !this.loading;

    this.timeline.toggleVisibility(showContent);
    this.profile.toggleVisibility(showContent);

    this.loadingIndicator.toggleVisibility(this.loading);
  }
}
