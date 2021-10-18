import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Source } from '../models/feed.model';
import SourceForm from './SourceForm';

type Props = {
  source: Source;
  onDelete: () => void;
  onEditSource: (newSource: Source) => void;
};

const FeedSource: React.FC<Props> = ({ source, onDelete, onEditSource }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleSourceUpdate = (updatedSource: Source) => {
    onEditSource(updatedSource);
    setIsEditable(false);
  };

  const handleCloseForm = () => {
    setIsEditable(false);
  };

  return (
    <li className="group flex items-center space-x-1 source py-1 text-sm">
      {!isEditable ? (
        <span className="truncate">{source.name}</span>
      ) : (
        <SourceForm
          existingSource={source}
          onClose={handleCloseForm}
          onAddSource={handleSourceUpdate}
        />
      )}
      <span className="hidden group-hover:inline-flex space-x-1">
        {!isEditable && (
          <>
            <PencilIcon
              onClick={() => setIsEditable(true)}
              className="h-4 text-primary-500 bg-primary-100 rounded-md p-0.5 hover:bg-primary-200"
            />
            <TrashIcon
              onClick={onDelete}
              className="h-4 text-red-500 bg-red-100 rounded-md p-0.5 hover:bg-red-200"
            />
          </>
        )}
      </span>
    </li>
  );
};

export default FeedSource;
