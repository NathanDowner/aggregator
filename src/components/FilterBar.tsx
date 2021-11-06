import { CheckCircleIcon } from '@heroicons/react/solid';
import { SourceFilter } from '../models/feed.model';

type FilterBarProps = {
  onToggleFilter: (index: number) => void;
  filters: SourceFilter[];
  isLoading: boolean;
};

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onToggleFilter,
  isLoading,
}) => {
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex space-x-4 max-w-[calc(100%-78px)] overflow-x-auto">
      {filters.map((filter, idx) => (
        <span
          onClick={() => onToggleFilter(idx)}
          key={filter.source.name}
          className={`${
            filter.isEnabled ? 'bg-white' : 'border'
          } cursor-pointer inline-flex items-center space-x-1 px-2 py-1 rounded-full `}
        >
          {filter.isEnabled && (
            <CheckCircleIcon className="h-3 flex-shrink-0" />
          )}
          <p key={filter.source.name} className="whitespace-nowrap">
            {filter.source.name}
          </p>
        </span>
      ))}
    </div>
  );
};

export default FilterBar;
