import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { Feed } from '../models/feed.model';

import Animations from './animations';
import FeedComponent from './FeedComponent';
import UserAuth from './UserAuth';

type SideBarProps = {
  feeds: Feed[];
  activeFeedIndex: number;
  setActiveFeed: React.Dispatch<React.SetStateAction<number>>;
  onAddFeed: (feedName: string) => void;
  onUpdateFeed: (feed: Feed) => void;
  isDrawerOpen: boolean;
};

const SideBar: React.FC<SideBarProps> = ({
  feeds,
  activeFeedIndex,
  setActiveFeed,
  onAddFeed,
  onUpdateFeed,
  isDrawerOpen,
}) => {
  const [showAddFeedField, setShowAddFeedField] = useState(false);
  const [newFeedName, setNewFeedName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (newFeedName.trim() !== '') {
      onAddFeed(newFeedName);
      setShowAddFeedField(false);
      setNewFeedName('');
    }
  }

  function toggleShowAddFeedField() {
    setShowAddFeedField((prev) => !prev);
  }

  return (
    <aside
      className={`top-0 pt-4 md:pt-12 flex-shrink-0 bg-white border-l h-screen w-72 transform transition-transform absolute z-20 md:sticky md:translate-x-0 ${
        !isDrawerOpen ? '-translate-x-full' : 'translate-x-0 '
      }`}
    >
      <div className="px-8 h-full flex flex-col">
        <h1 className="mb-8 text-primary-600 text-3xl">Aggregator</h1>
        <div className="flex justify-between items-center mb-1 pb-1 border-b">
          <h4 className="font-semibold text-lg">My Feeds</h4>
          <PlusCircleIcon
            onClick={toggleShowAddFeedField}
            className={`h-6 cursor-pointer text-primary-500 ${
              showAddFeedField && 'rotate-45 text-red-400'
            } transition-transform`}
          />
        </div>
        <ul>
          {feeds.map((feed, index) => (
            <FeedComponent
              key={feed.name}
              feed={feed}
              isActive={activeFeedIndex === index}
              onUpdateFeed={onUpdateFeed}
              onSelect={() => setActiveFeed(index)}
            />
          ))}

          <Animations.AppearDown reveal={showAddFeedField}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                placeholder="Create a new feed"
                autoFocus
                autoComplete="off"
                className="input w-full text-sm border-2 border-gray-400 outline-none"
                value={newFeedName}
                onChange={(e) => setNewFeedName(e.target.value)}
              />
              {Boolean(newFeedName.length) && (
                <button type="submit" className="button text-xs">
                  Add Feed
                </button>
              )}
            </form>
          </Animations.AppearDown>
        </ul>
        <UserAuth />
      </div>
    </aside>
  );
};

export default SideBar;
