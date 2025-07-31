import "./TextField.css";
import classNames from "classnames";
import magnifier from "../../assets/icon/magnifier.svg";
import edit from "../../assets/icon/edit.svg";
import check from "../../assets/icon/check.svg";
import close from "../../assets/icon/close.svg";

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
  console.log("TextField variant:", variant);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames("text-field", `text-field--${variant}`)}>
      {variant === "default" && (
        <img src={magnifier} alt="Search" className="text-field__icon" />
      )}

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
        <button
          className="text-field__action"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick?.();
          }}
        >
          <img src={edit} alt="Edit-icon" />
        </button>
      )}

      {variant === "compact-editable" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveClick?.();
            }}
          >
            <img src={check} alt="Check-icon" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
          >
            <img src={close} alt="Close-icon" />
          </button>
        </>
      )}
    </div>
  );
};
