import { SearchIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Feed } from '../models/feed.model';

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
      <div className="text-gray-400 text-sm">
        <h4 className="font-medium text-gray-500 mb-2">Filters</h4>
        <div className="flex space-x-4">
          {filters.map((source) => (
            <span
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
    </main>
  );
};

export default MainDisplay;
