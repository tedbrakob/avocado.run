import SNavLink from "./NavLink";
import styled from "styled-components";
import colors from "../static/colors";

const Header = styled.h1`
  font-family: 'Nunito Sans', sans-serif;
  color: ${colors.light};
  font-weight: 700;
  margin: 0;
  padding-bottom: 1rem;
`

const Div = styled.div`
  background-color: ${colors.dark};
  padding: 20px;
  text-align: center;
`

const Nav = styled.nav`
`;

export default function AppHeader() {
  return (
    <Div>
      <Header>RUNASS · SMOKEFAST · EATGRASS</Header>
      <Nav>
        <SNavLink to="/pace-calculator">Cool Running</SNavLink>
        {/* <SNavLink to="/strava-thing">Strava Thing</SNavLink>
        <SNavLink to="/spotify-thing">Spotify Thing</SNavLink> */}
      </Nav>
    </Div>
  );
}