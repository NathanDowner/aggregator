import { Session } from 'next-auth';
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
  return localStorage.getItem('userId');
}

export async function fetchFeeds(session?: Session): Promise<Feed[]> {
  const feeds = session
    ? await getFeeds(session.accessToken, session.uid)
    : await getSampleFeeds();
  return Object.keys(feeds).map((key) => feeds[key]);
}
