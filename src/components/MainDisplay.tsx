import { MenuIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import useGetFeeds from '../hooks/useGetFeeds';
import useSortableData from '../hooks/useSortableData';
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
import SearchBar from './SearchBar';
import SortControls from './SortControls';

type MainDisplayProps = {
  currentFeed: Feed;
  onOpenDrawer: () => void;
};

function initializeFilters(sources?: Source[]): SourceFilter[] {
  return sources
    ? sources.map((src) => ({ source: { ...src }, isEnabled: true }))
    : [];
}

const MainDisplay: React.FC<MainDisplayProps> = ({
  currentFeed,
  onOpenDrawer,
}) => {
  const { isLoading, error, getFeeds } = useGetFeeds<RSSBase>();
  const [articles, setArticles] = useState<FeedArticle[]>([]);
  const [rssFeeds, setRssFeeds] = useState<RSSBase[]>([]);
  const [filters, setFilters] = useState<SourceFilter[]>(() =>
    initializeFilters(currentFeed?.sources)
  );

  const [isUsingSearchFilter, setIsUsingSearchFilter] = useState(false);
  const [searchFilterItems, setSearchFilterItems] = useState<FeedArticle[]>([]);

  const { items, requestSort, sortConfig } = useSortableData<FeedArticle>(
    articles,
    { direction: 'descending', key: 'isoDate' }
  );

  const [pageHasScrolled, setPageHasScrolled] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const filteredArticles = getFilteredFeeds(rssFeeds, filters);
      setArticles(filteredArticles);
    }
  }, [filters]);

  useEffect(() => {
    if (currentFeed) {
      getFeeds(currentFeed.sources, applyData);
      setFilters(initializeFilters(currentFeed.sources));
    }
  }, [currentFeed, getFeeds]);

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

  function handleSearch(searchTerm: string) {
    console.log(searchTerm);
    if (searchTerm.length) {
      const filteredItems = items.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.trim())
      );

      setSearchFilterItems(filteredItems);
      setIsUsingSearchFilter(true);
    } else {
      setSearchFilterItems([]);
      setIsUsingSearchFilter(false);
    }
  }

  return (
    <main className="bg-gray-100 w-full overflow-y-scroll flex flex-col md:pt-20">
      <header className="sticky top-0 w-full p-4 bg-gray-100 shadow-md flex space-x-2 justify-start items-center md:hidden">
        <MenuIcon onClick={onOpenDrawer} className="h-8 text-gray-700" />
        <h1 className="text-primary-600 text-3xl">Aggregator</h1>
      </header>

      <div className="mb-6 px-4 text-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Header */}
          <h2 className="font-medium text-2xl mt-2 md:mt-0">
            {currentFeed?.name ?? 'Your Feed'}
          </h2>

          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading ? (
          <p>...</p>
        ) : (
          <h4>
            {isUsingSearchFilter ? searchFilterItems.length : articles.length}{' '}
            result
            {(isUsingSearchFilter
              ? searchFilterItems.length
              : articles.length) === 1
              ? ''
              : 's'}
          </h4>
        )}
      </div>

      <div className="px-4 text-gray-400 text-sm mb-4">
        <div className="flex justify-between font-medium text-gray-500 mb-2">
          <h4 className="">Filters</h4>
          <h4 className="">Sort</h4>
        </div>
        <div className="flex justify-between">
          <FilterBar filters={filters} onToggleFilter={handleToggleFilter} />

          <SortControls onSort={requestSort} sortConfig={sortConfig} />
        </div>
      </div>

      <div className="flex-grow px-4">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <>
            {!error && (
              <NewsFeed
                feedHasSources={Boolean(currentFeed?.sources)}
                articles={isUsingSearchFilter ? searchFilterItems : items}
              />
            )}
            {error && <p>Error: {error}</p>}
          </>
        )}
      </div>
    </main>
  );
};

export default MainDisplay;
