import classNames from "classnames";
import "./TextField.css";
import magnifer from "/src/assets/icon/magnifer.svg";

interface ITextFieldProps {
  size?: "default" | "compact" | "compact-editable";
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  icon?: boolean;
  className?: string;
  isEditing?: boolean;
}

export const TextField: React.FC<ITextFieldProps> = ({
  value,
  size = "default",
  onChange,
  isEditing = false,
  icon = false,
  placeholder = "Filter by name",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const sizeClass = size === "compact-editable" ? "compact" : size;
  return (
    <div
      className={classNames("text-field", `text-field--${sizeClass}`, {
        "text-field--editable": isEditing || size === "compact-editable",
        "text-field-icon": icon,
      })}
    >
      {icon && (
        <span>
          <img
            src={magnifer}
            alt="Search icon"
            className="text-field__icon-img"
          />
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="text-field__input"
        readOnly={!isEditing && size !== "compact-editable"}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
