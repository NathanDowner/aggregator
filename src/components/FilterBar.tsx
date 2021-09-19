import { CheckCircleIcon } from '@heroicons/react/solid';
import { SourceFilter } from '../models/feed.model';

type FilterBarProps = {
  onToggleFilter: (index: number) => void;
  filters: SourceFilter[];
};

const FilterBar: React.FC<FilterBarProps> = ({ filters, onToggleFilter }) => {
  return (
    <div className="flex flex-grow space-x-4">
      {filters.map((filter, idx) => (
        <span
          onClick={() => onToggleFilter(idx)}
          key={filter.source.name}
          className={`${
            filter.isEnabled ? 'bg-white' : 'border'
          } cursor-pointer inline-flex items-center space-x-1 px-2 py-1 rounded-full `}
        >
          {filter.isEnabled && <CheckCircleIcon className="h-3 " />}
          <p key={filter.source.name} className="">
            {filter.source.name}
          </p>
        </span>
      ))}
    </div>
  );
};

export default FilterBar;
