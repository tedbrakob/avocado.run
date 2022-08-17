import { NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../static/colors";

export default styled(NavLink)`
  color: ${colors.light};
  padding: .7rem;
  margin: .3rem;

  background-color: ${colors.primary};

  text-decoration: none;

  border-radius: .2rem;
  
  &[class*="active"] {
    filter: brightness(1.04);
    background-color: ${colors.darkAccent};
  };
`;