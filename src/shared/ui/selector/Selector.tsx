import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { classNames } from '@shared';

import './Selector.css';

export interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorOptionContentProps {
  value: string;
}

export const DefaultSelectorOptionContent = ({
  value,
}: SelectorOptionContentProps) => {
  return <>{value}</>;
};

interface SelectorProps {
  options?: SelectorOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  OptionContentComponent?: React.FC<SelectorOptionContentProps>;
}

export const Selector = ({
  options,
  value,
  onChange,
  placeholder,
  size = 'small',
  disabled = false,
  OptionContentComponent = DefaultSelectorOptionContent,
}: SelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const selectedValue = target.dataset.value;

      if (selectedValue !== undefined) {
        onChange(selectedValue);
        setIsOpen(false);
      }
    },
    [onChange]
  );

  const selectedOption = options?.find((opt) => opt.value === value) || null;

  const optionsList = useMemo(() => {
    return options?.map((option) => {
      if (option.value === value) return null;

      return (
        <div
          key={option.value}
          data-value={option.value}
          className="selector__option"
          onClick={handleClick}
        >
          <OptionContentComponent value={option.label} />
        </div>
      );
    });
  }, [options, value, OptionContentComponent, handleClick]);

  return (
    <div
      ref={containerRef}
      className={classNames(
        'selector',
        size === 'large' && 'selector--large',
        size === 'small' && 'selector--small',
        isOpen && 'selector--open'
      )}
    >
      <div
        className="selector__button"
        onClick={toggleOpen}
        aria-disabled={disabled}
      >
        <span className="selector__button-content">
          {selectedOption ? (
            <OptionContentComponent value={selectedOption.label} />
          ) : (
            <span className="selector__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="selector__arrow" />
      </div>

      {isOpen && (
        <div className="selector__dropdown">
          <div className="selector__options">{optionsList}</div>
        </div>
      )}
    </div>
  );
};
