import classNames from "classnames";
import { MagniferIcon } from "../../assets/icon/MagniferIcon";
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
  onClick,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames("text-field", `text-field--${variant}`)}>
      {variant === "default" && <MagniferIcon className="text-field__icon" />}

      <input
        className="text-field__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      />
    </div>
  );
};
