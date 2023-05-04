import styled from "styled-components";

const Input = styled.input`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type Props = {
  id?: string;
  size?: number;
  maxLength?: number;
  error?: boolean;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
  className?: string;
  type?: string;
  pattern?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props:Props) => {
  return (
    <Input
      className={`
        border-b-2 border-b-solid border-b-primary rounded-sm m-0.5 p-1 outline-none w-[50px]
        ${props.className}
        ${props.error ? "bg-error/40" : ""}
      `}
      id={props.id}
      size={props.size}
      maxLength={props.maxLength}
      inputMode={props.inputMode}
      type={props.type}
      pattern={props.pattern}
      value={props.value}
      onChange={props.onChange}
    ></Input>
  );
};

export default TextInput;