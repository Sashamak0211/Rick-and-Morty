interface IIconButtonProps {
  onClick: () => void;
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
      className={`text-field__action--${className} `}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
};
