import { databaseURL } from '../../firebase';
import { Feed } from '../models/feed.model';
import { getRequestBody } from './utils';

const userEmail = 'nathandowner123@gmail,com';

export const createFeed = async (feed: Feed) => {
  const resp = await fetch(
    `${databaseURL}/users/${userEmail}/feeds.json`,
    getRequestBody('PUT', { [feed.name]: feed })
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const getFeeds = async () => {
  const resp = await fetch(
    `${databaseURL}/users/${userEmail}/feeds.json`,
    getRequestBody('GET')
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};

export const updateFeed = async (feed: Feed) => {
  const resp = await fetch(
    `${databaseURL}/users/${userEmail}/feeds.json`,
    getRequestBody('PUT', { [feed.name]: feed })
  );
};

export const deleteFeed = async (feedName: string) => {
  const resp = await fetch(
    `${databaseURL}/users/${userEmail}/feeds/feedName/${feedName}.json`,
    getRequestBody('DELETE')
  );
  if (!resp.ok) {
    throw resp;
  }
  return resp.json();
};
