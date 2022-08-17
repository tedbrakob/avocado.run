// import SNavLink from "./NavLink";
import styled from "styled-components";
import colors from "../static/colors";

const Header = styled.h1`
  color: ${colors.light};
  margin: 0;
  font-weight: 700;

  @media (max-width: 584px) {
    display: none;
  }
`

const SmallHeader = styled.h1`
  color: ${colors.light};
  margin: 0;
  padding-bottom: 1rem;
  display: none;

  @media (max-width: 584px) {
    display: block;
  }
`

const Div = styled.div`
  background-color: ${colors.dark};
  padding: 20px;
  text-align: center;
`

// const Nav = styled.nav`

// `;

export default function AppHeader() {
  return (
    <Div>
      <Header>RUNASS · SMOKEFAST · EATGRASS</Header>
      <SmallHeader>🏃‍♂️💨🚬🌱👅🍑</SmallHeader>
      {/* <Nav> */}
        {/* <SNavLink to="/pace-calculator">Cool Running</SNavLink> */}
        {/* <SNavLink to="/strava-thing">Strava Thing</SNavLink> */}
        {/* <SNavLink to="/spotify-thing">Spotify Thing</SNavLink> */}
      {/* </Nav> */}
    </Div>
  );
}