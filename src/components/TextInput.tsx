import styled from "styled-components";
import colors from "../static/colors";

type Props = {
  error: boolean;
};

export default styled.input<Props>`
  color: ${colors.dark};
  border: none;
  border-bottom: 2px solid ${colors.primary};
  border-radius: 2px;
  margin: 2px;
  padding: 5px;
  outline: none;
  background-color: ${colors.error}${props => props.error ? 50 : 0};;
  font-size: 16px;
  width:40px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;