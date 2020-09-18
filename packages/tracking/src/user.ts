import { User } from './types';
import { requestAPI } from './api';

let USER_DATA: User;
let USER_REQUEST: Promise<User> | undefined;

export async function fetchUser(): Promise<User> {
  if (USER_DATA) {
    return USER_DATA;
  }

  // Prevent multiple concurrent requests to the user endpoint
  if (!USER_REQUEST) {
    USER_REQUEST = requestAPI<User>({
      endpoint: 'users/web',
    });
  }

  const user = await USER_REQUEST;
  USER_DATA = user;
  USER_REQUEST = undefined;

  return user;
}
