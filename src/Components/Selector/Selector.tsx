import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import "./Selector.css";

interface IOptions {
  value: string;
  label: string;
  color?: string;
}

interface ISelectorProps {
  options: IOptions[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
  size?: "large" | "small";
  disabled: boolean;
}

export const Selector = ({
  options,
  value,
  onChange,
  placeholder,
  size = "small",
  disabled = false,
}: ISelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames("selector", {
        "selector--large": size === "large",
        "selector--small": size === "small",
        "selector--open": isOpen,
      })}
      ref={selectorRef}
    >
      <button
        className="selector__button"
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span className="selector__button-content">
          {selectedOption ? (
            <>
              <span className="selector__label">{selectedOption.label}</span>
              {selectedOption.color && (
                <span
                  className="selector__dot"
                  style={{ backgroundColor: selectedOption.color }}
                />
              )}
            </>
          ) : (
            <span className="selector__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="selector__arrow" />
      </button>

      {isOpen && (
        <div className="selector__dropdown">
          <ul className="selector__options">
            {options.map((option) => (
              <li
                key={option.value}
                className={classNames("selector__option", {
                  "selector__option--selected": option.value === value,
                })}
                onClick={() => handleOptionClick(option.value)}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {option.label}
                  {option.color && size === "small" && (
                    <span
                      className="selector__dot"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
