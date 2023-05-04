type Props = {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

function Button (props: Props) {
  return (
    <button 
      className={`
        bg-white border-solid border-[1.5px] border-primary p-1 m-0.5 rounded-sm
        active:bg-dark-accent active:text-light active:border-dark-accent
        ${props.className}
      `}
      onClick={(event) => props.onClick(event)}
    >
      {props.value}
    </button>
  );
};

export default Button