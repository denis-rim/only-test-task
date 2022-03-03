import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/ONLY.svg";

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  min-height: 100vh;
  font-weight: 400;
  line-height: 1.5;
  place-content: center;
  background: #fff;
`;

const HeaderContainer = styled.header`
  margin: 2.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Layout() {
  return (
    <AppContainer>
      <HeaderContainer>
        <img src={logo} alt="logo" />
      </HeaderContainer>
      <Outlet />
    </AppContainer>
  );
}

export default Layout;
