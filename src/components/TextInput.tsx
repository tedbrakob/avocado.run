import styled from "styled-components";
import colors from "../static/colors";

export default styled.input`
  color: ${colors.dark};
  border: none;
  border-bottom: 2px solid ${colors.primary};
  border-radius: 2px;
  margin: 2px;
  padding: 5px;
  outline: none;
  font-size: 16px;
  width:40px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;