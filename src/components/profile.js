import {
  Hideable,
} from './hideable';

const selectors = {
  PROFILE_NAME: '#profile-name',
  PROFILE_IMAGE: '#profile-image',
  PROFILE_URL: '#profile-url',
  PROFILE_BIO: '#profile-bio',
};

export class Profile extends Hideable {
  constructor(element, $) {
    super(element);

    this.$ = $;
  }

  updateProfile(profile, username) {
    this.$(selectors.PROFILE_NAME).text(username);
    this.$(selectors.PROFILE_IMAGE).attr('src', profile.avatar_url);
    this.$(selectors.PROFILE_URL).attr('href', profile.html_url).text(profile.login);
    this.$(selectors.PROFILE_BIO).text(profile.bio || '(no information)');
  }
}
