import { SearchIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const DEBOUNCE_DURATION = 500;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  useDebounce(() => onSearch(searchTerm), DEBOUNCE_DURATION, [searchTerm]);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const clearText = () => setSearchTerm('');
  return (
    <div className="flex items-center bg-white input shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
      <SearchIcon className="h-4 mr-1 text-gray-400 flex-shrink-0" />
      <input
        type="text"
        className="text-md text-gray-400 flex-1 focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
      />
      {Boolean(searchTerm.length) && (
        <XCircleIcon
          onClick={clearText}
          className="h-4 mr-1 text-gray-400 flex-shrink-0 cursor-pointer"
        />
      )}
    </div>
  );
};

export default SearchBar;
