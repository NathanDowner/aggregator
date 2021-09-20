import { SearchIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, SortDescendingIcon } from '@heroicons/react/solid';
import { useEffect, useMemo, useState } from 'react';
import useGetFeeds from '../hooks/useGetFeeds';
import {
  FeedArticle,
  Feed,
  RSSBase,
  Source,
  SourceFilter,
} from '../models/feed.model';
import { compareFeedUrls } from '../utils';
import FilterBar from './FilterBar';
import NewsFeed from './NewsFeed';
import SortControls from './SortControls';

type MainDisplayProps = {
  currentFeed: Feed;
};

function initializeFilters(sources: Source[]): SourceFilter[] {
  return sources.map((src) => ({ source: { ...src }, isEnabled: true }));
}

const MainDisplay: React.FC<MainDisplayProps> = ({ currentFeed }) => {
  const { isLoading, error, getFeeds } = useGetFeeds<RSSBase>();
  const [articles, setArticles] = useState<FeedArticle[]>([]);
  const [rssFeeds, setRssFeeds] = useState<RSSBase[]>([]);
  const [filters, setFilters] = useState<SourceFilter[]>(() =>
    initializeFilters(currentFeed.sources)
  );

  function applyData(data: RSSBase[]) {
    setRssFeeds(data);
    let items: FeedArticle[] = [];
    data.forEach((feed) => {
      items = items.concat(feed.items);
    });
    setArticles(items);
  }

  function getFilteredFeeds(
    rssFeeds: RSSBase[],
    filters: SourceFilter[]
  ): FeedArticle[] {
    let filteredFeeds: FeedArticle[] = [];
    rssFeeds.forEach((feed) => {
      for (const filter of filters) {
        if (
          compareFeedUrls(filter.source.link, feed.feedUrl) &&
          filter.isEnabled
        ) {
          filteredFeeds = filteredFeeds.concat(feed.items);
        }
      }
    });
    return filteredFeeds;
  }

  function handleToggleFilter(index: number) {
    setFilters((previousFilters) =>
      previousFilters.map((prev, idx) =>
        idx === index ? { ...prev, isEnabled: !prev.isEnabled } : prev
      )
    );
  }

  useEffect(() => {
    if (!isLoading) {
      const filteredArticles = getFilteredFeeds(rssFeeds, filters);
      setArticles(filteredArticles);
    }
  }, [filters]);

  useEffect(() => {
    getFeeds(currentFeed.sources, applyData);
    setFilters(initializeFilters(currentFeed.sources));
  }, [currentFeed, getFeeds]);

  return (
    <main className="bg-gray-100 flex-grow px-6 pt-24 ">
      <div className="mb-6 text-gray-700">
        <div className="flex justify-between items-center">
          {/* Header */}
          <h2 className="font-medium  text-3xl">
            {currentFeed.name ?? 'Your Feed'}
          </h2>

          {/* Searchbar */}
          <div className="flex items-center bg-white input shadow-sm ">
            <SearchIcon className="h-4 mr-1 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              className="text-md text-gray-400 flex-1"
              placeholder="Search"
            />
          </div>
        </div>
        {isLoading ? (
          <p>...</p>
        ) : (
          <h4>
            {articles.length} result{articles.length === 1 ? '' : 's'}
          </h4>
        )}
      </div>

      <div className="text-gray-400 text-sm mb-4">
        <div className="flex justify-between font-medium text-gray-500 mb-2">
          <h4 className="">Filters</h4>
          <h4 className="">Sort</h4>
        </div>
        <div className="flex justify-between">
          <FilterBar filters={filters} onToggleFilter={handleToggleFilter} />

          <SortControls />
        </div>
      </div>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          {!error && <NewsFeed articles={articles} />}
          {error && <p>Error: {error}</p>}
        </>
      )}
    </main>
  );
};

export default MainDisplay;
