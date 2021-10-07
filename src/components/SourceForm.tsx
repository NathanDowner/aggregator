import { CheckIcon, LinkIcon, PlusIcon, TagIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import useCheckIfClickedOutside from '../hooks/useCheckIfClickedOutside';

type Props = {
  onAddSource: (sourceName: string, url: string) => void;
};

const SourceForm: React.FC<Props> = ({ onAddSource }) => {
  const [showAddSourceForm, setShowAddSourceForm] = useState(false);
  const [sourceName, setSourceName] = useState('');
  const [url, setUrl] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useCheckIfClickedOutside(
    formRef,
    () => setShowAddSourceForm(false),
    showAddSourceForm
  );

  const toggleShowInput = () => setShowAddSourceForm((prev) => !prev);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(sourceName, url);

    if (sourceName.trim().length && url.trim().length) {
      setSourceName('');
      setUrl('');
      onAddSource(sourceName, url);
      toggleShowInput();
    }
  }
  return (
    <>
      {!showAddSourceForm ? (
        <button
          onClick={toggleShowInput}
          className="flex items-center text-primary-500 rounded-md w-min px-2 py-1 hover:bg-blue-100 transform -translate-x-2 hover:translate-x-0 transition"
        >
          <PlusIcon className="h-4" />
          Add Source
        </button>
      ) : (
        <>
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
              className="flex flex-1 items-center justify-center bg-primary-500 hover:bg-primary-600"
            >
              <CheckIcon className="text-white h-4 px-1" />
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default SourceForm;
