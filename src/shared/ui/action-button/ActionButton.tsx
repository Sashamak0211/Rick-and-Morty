import { useSelector } from 'react-redux';

import { RootState } from '@/app';
import {
  CheckIcon,
  CheckWhite,
  CloseIcon,
  CloseWhite,
  EditIcon,
  EditWhite,
  IconButton,
} from '@/shared';

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
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className="icon-button-container">
      {isEditing ? (
        <>
          <IconButton className="icon-button__close" onClick={onCancel}>
            {isDark ? <CloseWhite /> : <CloseIcon />}
          </IconButton>
          <IconButton className="icon-button__check" onClick={onSave}>
            {isDark ? <CheckWhite /> : <CheckIcon />}
          </IconButton>
        </>
      ) : (
        <>
          <IconButton className="icon-button__edit" onClick={onEdit}>
            {isDark ? <EditWhite /> : <EditIcon />}
          </IconButton>
        </>
      )}
    </div>
  );
};
