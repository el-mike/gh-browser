import {
  Hideable,
} from './hideable';

import {
  getTimelineItem,
} from './timeline-item';

export class Timeline extends Hideable {
  constructor(element) {
    super(element);
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
