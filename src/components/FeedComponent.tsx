import { Disclosure, Transition } from '@headlessui/react';
import { RssIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Feed } from '../models/feed.model';
import Animations from './animations';

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
      {({ open }) => (
        <>
          <div
            className={`${
              isActive ? 'bg-blue-500 text-white' : 'hover:text-blue-500'
            } flex justify-between items-center p-2 my-1 text-sm w-full text-left
         rounded-lg `}
          >
            <div
              onClick={onSelect}
              className="flex flex-grow items-center space-x-2"
            >
              <RssIcon className="h-4" />
              <span className="text-sm">{feed.name}</span>
            </div>

            <Disclosure.Button
              className={`border-2 ${
                isActive ? 'border-blue-500' : 'border-white'
              } box-border hover:border-white rounded-lg p-1 `}
            >
              <ChevronDownIcon
                className={`h-4 ${open && 'rotate-180'} transition-transform`}
              />
            </Disclosure.Button>
          </div>
          <Animations.AppearDown reveal={open}>
            <Disclosure.Panel>
              <ul className="feed-src-list">
                {feed.sources.map((source) => (
                  <li
                    key={source.name}
                    className=" source py-1 text-sm text-gray-600"
                  >
                    {source.name}
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Animations.AppearDown>
        </>
      )}
    </Disclosure>
  );
};

export default FeedComponent;
