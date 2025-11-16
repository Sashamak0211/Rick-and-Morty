interface IIconButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export const IconButton = ({
  onClick,
  children,
  className = '',
}: IIconButtonProps) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
