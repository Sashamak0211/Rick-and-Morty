import CheckIcon from '@assets/icons/check.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';
import EditIcon from '@assets/icons/edit.svg?react';

import { IconButton } from '@/Widget';

interface IActionButton {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ActionButton = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: IActionButton) => {
  return (
    <div className="icon-button-container">
      {isEditing ? (
        <>
          <IconButton className="icon-button__close" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton className="icon-button__check" onClick={onSave}>
            <CheckIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton className="icon-button__close" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton className="icon-button__edit" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};
