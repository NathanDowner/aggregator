import { MenuIcon } from '@heroicons/react/solid';
import { RefreshIcon } from '@heroicons/react/outline';
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
  const [sourceFeeds, setSourceFeeds] = useState<{
    [feedTitle: string]: RSSBase[];
  }>({});
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

  useEffect(() => {
    if (currentFeed) {
      const filteredArticles = getFilteredFeeds(
        sourceFeeds[currentFeed.name] ?? [],
        filters
      );
      setArticles(filteredArticles);
    }
  }, [filters]);

  useEffect(() => {
    (async () => {
      if (currentFeed) {
        if (!sourceFeeds.hasOwnProperty(currentFeed.name)) {
          await getFeeds(currentFeed.sources, applyData);
        } else {
          setFilters(
            addFeedTitle(
              sourceFeeds[currentFeed.name],
              initializeFilters(currentFeed.sources)
            )
          );
        }
      }
    })();
  }, [currentFeed, getFeeds]);

  function extractFeedArticles(data: RSSBase[]): FeedArticle[] {
    let items: FeedArticle[] = [];
    data.forEach((feed) => {
      items = items.concat(feed.items);
    });
    return items;
  }

  function addFeedTitle(
    sources: RSSBase[],
    filtersWithoutTitles: SourceFilter[]
  ): SourceFilter[] {
    const updatedFilters: SourceFilter[] = [...filtersWithoutTitles];
    sources.forEach((feed, index) => {
      updatedFilters[index].rssFeedTitle = feed.title;
    });
    return updatedFilters;
  }

  function applyData(data: RSSBase[]) {
    setSourceFeeds((prev) => ({ ...prev, [currentFeed.name]: data }));

    setFilters((prev) =>
      addFeedTitle(data, initializeFilters(currentFeed.sources))
    );
  }

  function getFilteredFeeds(
    rssFeeds: RSSBase[],
    filters: SourceFilter[]
  ): FeedArticle[] {
    let filteredFeeds: FeedArticle[] = [];
    const enabledFeeds = rssFeeds.filter(
      (feed) =>
        filters.find((filter) => filter.rssFeedTitle === feed.title).isEnabled
    );

    return extractFeedArticles(enabledFeeds);
  }

  async function refreshFeed() {
    await getFeeds(currentFeed.sources, applyData);
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
        article.title
          .toLowerCase()
          .includes(searchTerm.trim().toLocaleLowerCase())
      );

      setSearchFilterItems(filteredItems);
      setIsUsingSearchFilter(true);
    } else {
      setSearchFilterItems([]);
      setIsUsingSearchFilter(false);
    }
  }

  return (
    <main className="bg-gray-100 w-full flex flex-col md:pt-8">
      <header className="sticky top-0 w-full p-4 bg-gray-100 shadow-md flex space-x-2 justify-start items-center md:hidden">
        <MenuIcon onClick={onOpenDrawer} className="h-8 text-gray-700" />
        <h1 className="text-primary-600 text-3xl">Aggregator</h1>
      </header>

      {/* Header */}
      <div className="mb-6 px-4 text-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center">
            <h2 className="font-medium text-2xl mt-2 md:mt-0">
              {currentFeed?.name ?? 'Your Feed'}{' '}
            </h2>
            <RefreshIcon
              onClick={refreshFeed}
              className=" h-6 ml-2 bg-primary-500 text-white p-1 rounded-full cursor-pointer transition-transform hover:-rotate-45 "
            />
          </div>

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

      {/* Filter and Sort */}

      <div className="px-4 text-gray-400 text-sm mb-4">
        <div className="flex justify-between font-medium text-gray-500 mb-2">
          <h4 className="">Filters</h4>
          <h4 className="">Sort</h4>
        </div>
        <div className="flex justify-between">
          <FilterBar
            isLoading={isLoading}
            filters={filters}
            onToggleFilter={handleToggleFilter}
          />

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
