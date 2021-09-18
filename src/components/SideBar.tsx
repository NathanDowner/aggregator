import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { Feed } from '../models/feed.model';
import FeedComponent from './FeedComponent';
import SideBarForm from './SideBarForm';

type SideBarProps = {
  feeds: Feed[];
  activeFeedIndex: number;
  setActiveFeed: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar: React.FC<SideBarProps> = ({
  feeds,
  activeFeedIndex,
  setActiveFeed,
}) => {
  // const [feeds, setFeeds] = useState<Feed[]>([]);

  const [showAddFeedField, setShowAddFeedField] = useState(false);

  return (
    <aside className="sticky top-0 px-8 pt-12 border-l h-screen w-72">
      <h1 className="text-green-600 text-2xl">Aggregator</h1>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-1 pb-1 border-b">
          <h4>My Feeds</h4>
          <PlusCircleIcon
            onClick={() => setShowAddFeedField(true)}
            className="h-4 cursor-pointer"
          />
        </div>
        <ul className="">
          {feeds.map((feed, index) => (
            <FeedComponent
              key={feed.name}
              feed={feed}
              isActive={activeFeedIndex === index}
              onSelect={() => setActiveFeed(index)}
            />
          ))}
          {showAddFeedField && (
            <input
              type="text"
              placeholder="Create a new feed"
              autoFocus
              className="p-2 w-full text-sm border-b-2 border-blue-500 outline-none"
            />
          )}
        </ul>

        {/* <SideBarForm onSubmit={handleAddFeed} /> */}
      </div>
    </aside>
  );
};

export default SideBar;
