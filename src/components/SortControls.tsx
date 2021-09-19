import { SortDescendingIcon, SortAscendingIcon } from '@heroicons/react/solid';

const SortControls = () => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <div className="bg-white p-1 pl-3 rounded-l-full ">Date</div>
      <div className="bg-white p-1 pr-3 rounded-r-full ">
        <SortDescendingIcon className="h-5" />
      </div>
    </div>
  );
};

export default SortControls;
