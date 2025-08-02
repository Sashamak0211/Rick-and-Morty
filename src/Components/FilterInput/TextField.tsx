import classNames from "classnames";
import { MagniferIcon } from "../../assets/icon/MagniferIcon";
import { EditIcon } from "../../assets/icon/EditIcon";
import { CheckIcon } from "../../assets/icon/CheckIcon";
import { CloseIcon } from "../../assets/icon/CloseIcon";
import "./TextField.css";

type TextFieldVariant = "default" | "compact" | "compact-editable";

interface ITextFieldProps {
  variant?: TextFieldVariant;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  readOnly?: boolean;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  disableClick?: boolean;
  onClick?: () => void;
}

export const TextField: React.FC<ITextFieldProps> = ({
  variant = "default",
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  readOnly = false,
  disableClick,
  onClick,
  onEditClick,
  onSaveClick,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames("text-field", `text-field--${variant}`)}>
      {variant === "default" && <MagniferIcon className="test-field__icon" />}

      <input
        className="text-field__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        onClick={disableClick ? undefined : onClick}
      />

      {variant === "compact" && (
        <>
          <button
            className="text-field__action text-field__action--close"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
          >
            <CloseIcon />
          </button>
          <button
            className="text-field__action text-field__action--edit"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
          >
            <EditIcon />
          </button>
        </>
      )}

      {variant === "compact-editable" && (
        <>
          <button
            className="text-field__action text-field__action--close"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
          >
            <CloseIcon />
          </button>
          <button
            className="text-field__action text-field__action--check"
            onClick={(e) => {
              e.stopPropagation();
              onSaveClick?.();
            }}
          >
            <CheckIcon />
          </button>
        </>
      )}
    </div>
  );
};
