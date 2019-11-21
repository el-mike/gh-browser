import {
  PULL_REQUEST_EVENT,
  PULL_REQUEST_REVIEW_COMMENT_EVENT,
} from '../config';

import {
  formatDate,
} from '../utils';

const wrapTemplate = (itemTemplate, event, isPrimary) => `
<div class="timeline-item ${isPrimary ? 'is-primary' : ''}">
  <div class="timeline-marker ${isPrimary ? 'is-primary' : ''}"></div>
  <div class="timeline-content">
    <p class="heading">${formatDate(event.created_at)}</p>
    <div class="media">
      <figure class="media-left">
        <p class="image is-32x32">
          <img src="${event.actor.avatar_url}"/>
        </p>
      </figure>
      ${itemTemplate}
    </div>
  </div>
</div>  
`;

const getPullRequestTemplate = event => `
<div class="media-content">
  <a href="${event.actor.url}">${event.actor.display_login}</a>
  ${event.payload.action}
  <a href="${event.payload.pull_request.url}">pull request</a>
  <p class="repo-name">
    <a href="${event.repo.url}">${event.repo.name}</a>
  </p>
</div>
`;

const getPullRequestReviewCommentTemplate = event => `
<div class="media-content">
  <a href="${event.actor.url}">${event.actor.display_login}</a>
  ${event.payload.action}
  <a href="${event.payload.comment.url}">comment</a>
  to
  <a href="${event.payload.pull_request.url}">pull request</a>
  <p class="repo-name">
    <a href="${event.repo.url}">${event.repo.name}</a>
  </p>
</div>
`;

const getFallbackTemplate = event => `
<div class="media-content">
  <a href="${event.actor.url}">${event.actor.display_login}</a>
  did something in
  to
  <a href="${event.payload.pull_request.url}">pull request</a>
  <p class="repo-name">
    <a href="${event.repo.url}">${event.repo.name}</a>
  </p>
</div>
`;

export const getTimelineItem = (event, isPrimary) => {
  if (event.type === PULL_REQUEST_EVENT) {
    return wrapTemplate(getPullRequestTemplate(event), event, isPrimary);
  }

  if (event.type === PULL_REQUEST_REVIEW_COMMENT_EVENT) {
    return wrapTemplate(getPullRequestReviewCommentTemplate(event), event, isPrimary);
  }

  return wrapTemplate(getFallbackTemplate(event), event, isPrimary);
}
