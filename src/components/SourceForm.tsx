import { CheckIcon, LinkIcon, TagIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { Source } from '../models/feed.model';

type Props = {
  onAddSource: (newSource: Source) => void;
  onClose: () => void;
  existingSource?: Source;
};

const SourceForm: React.FC<Props> = ({
  onAddSource,
  onClose,
  existingSource = { name: '', link: '' },
}) => {
  const [sourceName, setSourceName] = useState(existingSource.name);
  const [url, setUrl] = useState(existingSource.link);
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, onClose);

  function handleSubmit(e) {
    e.preventDefault();

    if (sourceName.trim().length && url.trim().length) {
      setSourceName('');
      setUrl('');
      const newSource: Source = { name: sourceName, link: url };
      onAddSource(newSource);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex border-2 border-primary-500 rounded-lg"
    >
      <div className="flex flex-col py-1 px-2 text-sm">
        <div className="flex items-center space-x-1">
          <TagIcon className="h-4 flex-shrink-0 text-gray-400" />
          <input
            className="w-full outline-none"
            placeholder="New source name"
            autoFocus
            autoComplete="off"
            required
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
          />
        </div>
        <div className="h-[1px] bg-gray-200 my-1 rounded-full" />
        <div className="flex items-center space-x-1">
          <LinkIcon className="h-4 flex-shrink-0 text-gray-400" />
          <input
            className="w-full outline-none"
            type="url"
            placeholder="url"
            autoComplete="off"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex flex-1 items-center justify-center rounded-r-sm bg-primary-500 hover:bg-primary-600"
      >
        <CheckIcon className="text-white h-4 px-1" />
      </button>
    </form>
  );
};

export default SourceForm;
