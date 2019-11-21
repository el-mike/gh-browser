export class GithubService {
  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => this.parseResponse(response));
  }

  getUserEvents(username) {
    return fetch(`https://api.github.com/users/${username}/events/public`)
      .then(response => this.parseResponse(response));
  }

  parseResponse(response) {
    return response.json();
  }
}
