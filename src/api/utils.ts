import { User } from '@firebase/auth';
import { Feed } from '../models/feed.model';
import { getFeeds, getSampleFeeds } from './feeds';

export function getRequestBody(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any = null,
  additionalHeaders?: HeadersInit
): RequestInit {
  const request: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  };

  return method === 'GET' || method === 'DELETE'
    ? request
    : { ...request, body: JSON.stringify(body) };
}

export function getRequestBodyWithAuth(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any = null
): RequestInit {
  return getRequestBody(method, body, {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  });
}

export function getUserId() {
  return localStorage.getItem('uid');
}

export async function fetchFeeds(currentUser?: User): Promise<Feed[]> {
  const feeds = currentUser ? await getFeeds() : await getSampleFeeds();
  return feeds // check if the user has no feeds
    ? Object.keys(feeds).map(
        (key): Feed => ({
          ...feeds[key],
          id: key,
          sources: feeds[key].sources ?? [],
        })
      )
    : [];
}
