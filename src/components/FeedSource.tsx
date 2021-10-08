import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Source } from '../models/feed.model';

type Props = {
  source: Source;
  onDelete: () => void;
  onEditName: (newName: string) => void;
};

const FeedSource: React.FC<Props> = ({ source, onDelete, onEditName }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleNameUpdate = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      setIsEditable(false);
      const newName = (ev.target as Element).innerHTML.replace(/<br>/gi, '');
      onEditName(newName);
    }
  };
  return (
    <li className="group flex items-center space-x-1 source py-1 text-sm">
      <span
        className="truncate"
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        onKeyPress={(event) => {
          handleNameUpdate(event);
        }}
      >
        {source.name}
      </span>
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
