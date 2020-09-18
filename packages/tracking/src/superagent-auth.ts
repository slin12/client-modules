import Uri from 'jsuri';
import { SuperAgentRequest } from 'superagent';

export const authUrl = (authToken: string, url: string): string =>
  new Uri(url).addQueryParam('authentication_token', authToken).toString();

/**
 * superagent userAuth plugin
 *
 * sets the user auth token param
 *
 * general usage:
 * import {userAuth} from 'libs/superagent-auth';
 *
 * request
 *   .use(userAuth)
 *
 */
export const userAuth = (authToken: string, userID: string) => (
  request: SuperAgentRequest
): SuperAgentRequest => {
  if (authToken && userID) {
    request.url = authUrl(authToken, request.url);

    request.set('X-Auth-Token', authToken);
    request.set('X-User-Id', userID);
  }
  return request;
};

/**
 * superagent API auth plugin
 *
 * sets the auth needed for API requests
 *
 * general usage:
 * import {apiAuth} from 'libs/superagent-auth';
 *
 * request
 * 	.use(apiAuth)
 *
 */
export const apiAuth = (authToken: string, userID: string) => (
  request: SuperAgentRequest
): SuperAgentRequest => {
  if (authToken && userID) {
    request.set('X-Auth-Token', authToken);
    request.set('X-User-Id', userID);
  }
  return request;
};
