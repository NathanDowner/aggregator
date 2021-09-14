import { Disclosure } from '@headlessui/react';
import { RssIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Feed } from '../models/feed.model';

type FeedComponentProps = {
  feed: Feed;
  isActive: boolean;
  onSelect: () => void;
};

const FeedComponent = ({ feed, isActive, onSelect }: FeedComponentProps) => {
  return (
    <Disclosure
      as="li"
      key={feed.name}
      className="cursor-pointer whitespace-nowrap"
    >
      <div
        onClick={onSelect}
        className={`${
          isActive ? 'bg-blue-500 text-white' : ''
        } flex justify-between items-center p-2 my-1 text-sm w-full text-left ${
          !isActive && 'hover:bg-blue-200'
        } rounded-lg`}
      >
        <div className="flex items-center space-x-2">
          <RssIcon className="h-4" />
          <span className="text-sm">{feed.name}</span>
        </div>
        {feed.sources.length && (
          <Disclosure.Button>
            <ChevronDownIcon className=" h-4 group-hover:block" />
          </Disclosure.Button>
        )}
      </div>
      <Disclosure.Panel>
        <ul className="">
          {feed.sources.map((source) => (
            <li key={source.name} className="ml-4">
              {source.name}
            </li>
          ))}
        </ul>
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default FeedComponent;
