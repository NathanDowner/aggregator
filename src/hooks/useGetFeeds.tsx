import { useCallback, useState } from 'react';
import Parser from 'rss-parser';
import { Source } from '../models/feed.model';

const CORS_PROXY = 'http://localhost:4050/';

type UseGetFeedsReturn<T> = {
  error: null | string;
  isLoading: boolean;
  getFeeds: (sources: Source[], handleData: (data: T[]) => void) => void;
};

export default function useGetFeeds<T>(): UseGetFeedsReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFeeds = useCallback(
    async (sources: Source[], handleData: (data: T[]) => void) => {
      setError(null);
      setIsLoading(true);
      try {
        const parser = new Parser<T>();
        const promises: Promise<T>[] = sources.map(({ link }) =>
          parser.parseURL(CORS_PROXY + link)
        );

        let rssFeeds = await Promise.all(promises);
        handleData(rssFeeds);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      }
      setIsLoading(false);
    },
    []
  );

  return { error, isLoading, getFeeds };
}
