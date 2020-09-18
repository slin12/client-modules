/* eslint-disable no-console */
import { beacon } from './beacon';
import {
  TrackingOptions,
  EventDataTypes,
  UserClickData,
  UserVisitData,
} from './types';

export class Track {
  authToken: string;
  userID: string;
  verbose: boolean;

  constructor(auth_token: string, user_id: string, verbose = false) {
    this.authToken = auth_token;
    this.userID = user_id;
    this.verbose = verbose;
  }

  event<
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

    const data = new FormData();
    data.append('category', category);
    data.append('event', event as string);
    data.append('properties', JSON.stringify(properties));
    data.append('gdpr_safe', `${options.gdprSafe}`);

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

    // Use navigator.sendBeacon if possible to ensure
    // Data is sent even if the page is unloaded
    // Falls back to XHR
    beacon(
      `https://www.codecademy.com/analytics/${category}`,
      data,
      this.authToken,
      this.userID
    );
  }

  click(data: UserClickData) {
    this.event('user', 'click', data);
  }

  visit(data: UserVisitData) {
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
