import request from 'superagent';
import { userAuth, authUrl } from './superagent-auth';

/**
 * navigator.sendBeacon wrapper
 * uses sendBeacon if it exists, and normal sync XHR if it doesnt
 *
 * usage:
 * import beacon from 'libs/beacon';
 *
 * beacon('/my_logging_endpoint', data)
 */

type BeaconData = FormData | undefined;

const canUseBeacon = () =>
  window.navigator && typeof window.navigator.sendBeacon === 'function';

const sendBeacon = (url: string, data: BeaconData, authToken: string) =>
  navigator.sendBeacon(authUrl(authToken, url), data);

const sendXHR = (
  url: string,
  data: BeaconData,
  authToken: string,
  userID: string
) => {
  const req = request.post(url).use(userAuth(authToken, userID));

  if (!data) {
    req.set('Content-Type', 'text/plain;charset=UTF-8');
  } else {
    req.send(data);
  }

  req.end();
};

export const beacon = (
  url: string,
  data: BeaconData,
  authToken: string,
  userID: string
) => {
  const useBeacon = canUseBeacon();
  if (useBeacon) {
    sendBeacon(url, data, authToken);
  } else {
    sendXHR(url, data, authToken, userID);
  }
};
