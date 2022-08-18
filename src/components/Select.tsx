import styled from "styled-components";
import colors from "../static/colors";

export default styled.select`
  padding: 2.5px;
  margin: 5px;
  color: ${colors.dark};
  border: none;
  border-bottom: 2px solid ${colors.primary};
  border-radius: 2px;
  font-size: 16px;
`;