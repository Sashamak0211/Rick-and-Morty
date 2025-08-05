interface IIconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  children: React.ReactNode;
}

export const IconButton = ({
  onClick,
  children,
  className = "",
}: IIconButtonProps) => {
  return (
    <button
      className={`icon-button ${className} `}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      type="button"
    >
      {children}
    </button>
  );
};
