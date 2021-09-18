import { SearchIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import useGetFeeds from '../hooks/useGetFeeds';
import { FeedArticle, Feed, RSSBase } from '../models/feed.model';
import NewsFeed from './NewsFeed';

type SourceFilter = {
  name: string;
  isEnabled: boolean;
};

const filters: SourceFilter[] = [
  { name: 'Cnet', isEnabled: true },
  { name: 'Front Page Tech', isEnabled: true },
  { name: 'The Verge', isEnabled: false },
];

type MainDisplayProps = {
  currentFeed: Feed;
};

const MainDisplay: React.FC<MainDisplayProps> = ({ currentFeed }) => {
  const [articles, setArticles] = useState<FeedArticle[]>([]);
  const { isLoading, error, getFeeds } = useGetFeeds<RSSBase>();

  function applyData(data: RSSBase[]) {
    let items: FeedArticle[] = [];
    data.forEach((feed) => {
      items = items.concat(feed.items);
    });
    setArticles(items);
  }

  useEffect(() => {
    getFeeds(currentFeed.sources, applyData);

    return () => {};
  }, [currentFeed, getFeeds]);

  return (
    <main className="bg-gray-100 flex-grow px-6 pt-24 ">
      <div className="flex justify-between items-center mb-6">
        {/* Header */}
        <h2 className="font-medium text-gray-700 text-3xl">
          {currentFeed?.name ?? 'Your Feed'}
        </h2>

        {/* Searchbar */}
        <div className="flex items-center bg-white input shadow-sm ">
          <SearchIcon className="h-4 mr-1 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            className="text-sm text-gray-400 flex-1"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="text-gray-400 text-sm mb-4">
        <h4 className="font-medium text-gray-500 mb-2">Filters</h4>
        <div className="flex space-x-4">
          {filters.map((source) => (
            <span
              key={source.name}
              className={`${
                source.isEnabled ? 'bg-white' : ''
              } inline-flex items-center space-x-1 px-2 py-1 rounded-full `}
            >
              {source.isEnabled && <CheckCircleIcon className="h-3 " />}
              <p key={source.name} className="">
                {source.name}
              </p>
            </span>
          ))}
        </div>
      </div>
      <NewsFeed articles={articles} />
    </main>
  );
};

export default MainDisplay;