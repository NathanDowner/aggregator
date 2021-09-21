import { SortDescendingIcon, SortAscendingIcon } from '@heroicons/react/solid';
import { SortConfig } from '../models/sort.model';

type SortControlsProps = {
  sortConfig: SortConfig;
  onSort: (key: string) => void;
};

const SortControls: React.FC<SortControlsProps> = ({ sortConfig, onSort }) => {
  const SortIcon =
    sortConfig.direction === 'ascending'
      ? SortAscendingIcon
      : SortDescendingIcon;
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <div className="bg-white p-1 pl-2 rounded-l-full ">Date</div>
      <div className="bg-white p-1 pr-2 rounded-r-full ">
        <SortIcon onClick={() => onSort('isoDate')} className="h-5" />
      </div>
    </div>
  );
};

export default SortControls;
