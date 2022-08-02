import AppHeader from "./components/AppHeader";
import { Outlet } from "react-router-dom";
import './App.css';
import styled from "styled-components";
import colors from "./static/colors";

const SiteBody = styled.div`
  padding-top: 20px;
  background-size: cover;
`;

const Site = styled.div`
  height: 100%;
  background-color: ${colors.light};
`;

export default function App() {
  return (
    <Site align="center">
      <AppHeader />
      <SiteBody>
        <Outlet />
      </SiteBody>
    </Site>
  );
}