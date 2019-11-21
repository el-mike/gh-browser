import {
  getTimelineItem,
} from './timeline-item';

export class Timeline {
  constructor(element) {
    this.element = element;
  }

  render(events) {
    this.element.empty();

    this.element.html(
      (events || [])
      .map((event, index) => getTimelineItem(event, index === 0))
      .join('')
    );
  }
}
