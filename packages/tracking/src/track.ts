/* eslint-disable no-console */
import type { API } from './api';

import type {
  TrackingOptions,
  EventDataTypes,
  UserClickData,
  UserVisitData,
} from './types';

export class Track {
  api: API;
  verbose: boolean;

  constructor(api: API, verbose = false) {
    this.api = api;
    this.verbose = verbose;
  }

  async event<
    Category extends keyof EventDataTypes,
    Event extends keyof EventDataTypes[Category],
    Data extends EventDataTypes[Category][Event]
  >(
    category: Category,
    event: Event,
    userData: Data,
    options: TrackingOptions = {}
  ) {
    if (!userData) (userData as any) = {};

    const properties = {
      ...userData,
      fullpath: window.location.pathname + window.location.search,
      search: window.location.search,
      path: window.location.pathname,
      title: window.document.title,
      url: window.location.href,
    };

    if (this.verbose) {
      console.groupCollapsed(
        `%cTracking Event Fired: ${category}:${event}`,
        'color: #4b35ef; font-style: italic;'
      );
      console.log({
        category,
        event,
        properties,
      });
      console.groupEnd();
    }

    this.api.beacon(`/analytics/${category}`, {
      category,
      event: event as string,
      properties: JSON.stringify(properties),
      gdpr_safe: `${options.gdprSafe}`,
    });
  }

  async click(data: UserClickData) {
    this.event('user', 'click', data);
  }

  async visit(data: UserVisitData) {
    this.event('user', 'visit', data);
  }

  pushDataLayerEvent(eventName: string) {
    // Set an arbitrary global property on the window variable.
    const w = window as any;
    if (w.dataLayer === undefined) {
      w.dataLayer = [];
    }

    w.dataLayer.push({ event: eventName });
  }
}
