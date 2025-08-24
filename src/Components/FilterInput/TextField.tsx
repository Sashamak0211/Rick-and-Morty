import classNames from "classnames";
import "./TextField.css";
import type { ReactNode } from "react";
import { MagniferIcon } from "../../assets/icon/MagniferIcon";

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
  className?: string;
  id?: string;
  icon?: ReactNode;
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
  className,
  id,
  icon = <MagniferIcon className="text-field__icon" />,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      className={classNames("text-field", `text-field--${variant}`, className)}
    >
      {variant === "default" && <>{icon}</>}

      <input
        id={id}
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
