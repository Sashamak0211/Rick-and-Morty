import { IconButton } from "../../Widget/IconButton";
import { CloseIcon } from "../../assets/icon/CloseIcon";
import { CheckIcon } from "../../assets/icon/CheckIcon";
import { EditIcon } from "../../assets/icon/EditIcon";

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
