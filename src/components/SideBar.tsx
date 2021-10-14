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
};

const SideBar: React.FC<SideBarProps> = ({
  feeds,
  activeFeedIndex,
  setActiveFeed,
  onAddFeed,
  onUpdateFeed,
}) => {
  const [showAddFeedField, setShowAddFeedField] = useState(false);
  const [newFeedName, setNewFeedName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (newFeedName.trim() !== '') {
      onAddFeed(newFeedName);
      setNewFeedName('');
    }
  }

  function toggleShowAddFeedField() {
    setShowAddFeedField((prev) => !prev);
  }

  return (
    <aside className="sticky top-0 px-8 pt-12 flex-shrink-0 border-l h-screen w-72">
      <h1 className="text-primary-600 text-3xl">Aggregator</h1>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-1 pb-1 border-b">
          <h4 className="font-semibold text-lg">My Feeds</h4>
          <PlusCircleIcon
            onClick={toggleShowAddFeedField}
            className={`h-6 cursor-pointer ${
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

        {/* Auth Section */}
        <UserAuth />
      </div>
    </aside>
  );
};

export default SideBar;
