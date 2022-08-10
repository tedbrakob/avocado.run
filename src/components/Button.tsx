import styled from "styled-components";
import colors from "../static/colors";

export default styled.button`
  background-color: field;
  color: ${colors.dark};
  border: solid 1.5px ${colors.primary};
  padding: 5px;
  border-radius: 2px;
  font-size: 16px;
  margin: 2px;

	&:active {
    background-color: ${colors.darkAccent};
    color: ${colors.light};
    border: solid 1.5px ${colors.darkAccent};
  }
`