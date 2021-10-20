import { databaseURL } from '../../firebase';
import { Feed } from '../models/feed.model';
import { getRequestBody, getRequestBodyWithAuth, getUserId } from './utils';

export const createFeed = async (feed: Feed) => {
  const resp = await fetch(
    `${databaseURL}/users/${getUserId()}/feeds.json`,
    getRequestBodyWithAuth('POST', { ...feed })
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const getFeeds = async (token: string, userId?: string | number) => {
  const resp = await fetch(
    `${databaseURL}/users/${userId ?? getUserId()}/feeds.json`,
    getRequestBody('GET', null, { Authorization: `Bearer ${token}` })
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const getSampleFeeds = async () => {
  const resp = await fetch(
    `${databaseURL}/sample_feeds.json`,
    getRequestBody('GET')
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const updateFeed = async ({ id, ...rest }: Feed) => {
  const resp = await fetch(
    `${databaseURL}/users/${getUserId()}/feeds/${id}.json`,
    getRequestBodyWithAuth('PUT', { ...rest })
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const deleteFeed = async (id: string) => {
  const resp = await fetch(
    `${databaseURL}/users/${getUserId()}/feeds/feedName/${id}.json`,
    getRequestBodyWithAuth('DELETE')
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};
