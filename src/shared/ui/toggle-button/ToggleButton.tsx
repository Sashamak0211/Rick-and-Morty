import React, { ReactElement } from 'react';

import './ToggleButton.css';

interface IToggleButtonProps {
  onClick: () => void;
  icon?: ReactElement;
}
export const ToggleButton: React.FC<IToggleButtonProps> = ({
  onClick,
  icon,
}) => {
  return (
    <button onClick={onClick} className="toggle-button">
      <span className="toggle-button__icon">{icon}</span>
    </button>
  );
};
