import { Disclosure } from '@headlessui/react';
import { RssIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { Feed, Source } from '../models/feed.model';
import Animations from './animations';
import FeedSource from './FeedSource';
import SourceForm from './SourceForm';

type FeedComponentProps = {
  feed: Feed;
  isActive: boolean;
  onSelect: () => void;
  onUpdateFeed: (feed: Feed) => void;
};

const FeedComponent = ({
  feed,
  isActive,
  onSelect,
  onUpdateFeed,
}: FeedComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFeed, setUpdatedFeed] = useState<Feed>({ ...feed });
  const [showAddSourceForm, setShowAddSourceForm] = useState(false);

  const handleAddSource = (newSource: Source) => {
    const existingSource = updatedFeed.sources.find(
      (src) => src.name === newSource.name
    );

    if (!existingSource) {
      setIsEditing(true);
      setUpdatedFeed((prev) => ({
        ...prev,
        sources: [...prev.sources, newSource],
      }));
      setShowAddSourceForm(false);
    }
  };

  const handleCloseSourceForm = () => {
    if (showAddSourceForm) {
      setShowAddSourceForm(false);
    }
  };

  const toggleShowInput = () => setShowAddSourceForm((prev) => !prev);

  const handleRemoveSource = (sourceName: string) => {
    setIsEditing(true);
    setUpdatedFeed((prev) => ({
      ...prev,
      sources: prev.sources.filter((src) => src.name !== sourceName),
    }));
  };

  const handleEditSource = (index: number, updatedSource: Source) => {
    setIsEditing(true);
    setUpdatedFeed((prev) => ({
      ...prev,
      sources: prev.sources.map((src, idx) =>
        idx === index ? updatedSource : src
      ),
    }));
  };

  const handleCancelEdit = () => {
    setUpdatedFeed(feed);
    setIsEditing(false);
  };

  const handleUpdateFeed = () => {
    onUpdateFeed(updatedFeed);
    setIsEditing(false);
  };

  return (
    <Disclosure
      as="li"
      key={feed.name}
      className="cursor-pointer whitespace-nowrap"
    >
      {({ open }) => (
        <>
          <div
            className={`${
              isActive ? 'bg-primary-500 text-white' : 'hover:text-primary-500'
            } flex justify-between items-center p-2 my-1 text-sm w-full text-left
         rounded-lg `}
          >
            <div
              onClick={onSelect}
              className="flex flex-grow items-center space-x-2"
            >
              <RssIcon className="h-4" />
              <span className="text-sm">{updatedFeed.name}</span>
            </div>

            <Disclosure.Button
              className={`border-2 ${
                isActive ? 'border-primary-500' : 'border-white'
              } box-border hover:border-white rounded-lg p-1 `}
            >
              <ChevronDownIcon
                className={`h-4 ${open && 'rotate-180'} transition-transform`}
              />
            </Disclosure.Button>
          </div>
          <Animations.AppearDown reveal={open}>
            <Disclosure.Panel className="text-gray-600">
              <ul className="feed-src-list">
                {updatedFeed.sources.map((source, index) => (
                  <FeedSource
                    key={source.name}
                    source={source}
                    onDelete={() => handleRemoveSource(source.name)}
                    onEditSource={(updateSource: Source) =>
                      handleEditSource(index, updateSource)
                    }
                  />
                ))}
                <li className="source">
                  {showAddSourceForm ? (
                    <SourceForm
                      onAddSource={handleAddSource}
                      onClose={handleCloseSourceForm}
                    />
                  ) : (
                    <button
                      onClick={toggleShowInput}
                      className="flex items-center text-primary-500 rounded-md w-min px-2 py-1 hover:bg-blue-100 transform -translate-x-2 hover:translate-x-0 transition"
                    >
                      <PlusIcon className="h-4" />
                      Add Source
                    </button>
                  )}
                </li>
              </ul>

              {/* Button Row */}
              {isEditing && (
                <div className="flex items-center space-x-2 mt-2 ml-2 text-xs">
                  <span
                    onClick={handleCancelEdit}
                    className="p-1 border-2 text-gray-400 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </span>
                  <span
                    onClick={handleUpdateFeed}
                    className="text-primary-500 p-1 bg-primary-100 border-2 border-primary-100 rounded-md hover:bg-primary-200 cursor-pointer"
                  >
                    Save Changes
                  </span>
                </div>
              )}
            </Disclosure.Panel>
          </Animations.AppearDown>
        </>
      )}
    </Disclosure>
  );
};

export default FeedComponent;
