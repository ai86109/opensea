import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import {ResetStyle, GlobalStyle} from '../globalStyle'

const AppWrapper = styled.div``
const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
`
const NavBlock = styled.div`
  &:hover {
    & a {
      color: rgba(46, 68, 78, 0.5);
    }
  }
  & a {
    display: block;
    color: rgb(46, 68, 78);
    font-size: 20px;
    font-weight: 800;
  }
  & + & {
    margin-left: 10px;
  }
`

function Layout() {
  return (
    <AppWrapper>
      <ResetStyle/>
      <GlobalStyle/>
      <NavWrapper>
        <NavBlock><Link to="/listing">ListingPage</Link></NavBlock>
        <NavBlock><Link to="/watchlist">WatchlistPage</Link></NavBlock>
      </NavWrapper>
      <Outlet/>
    </AppWrapper>
  );
}

export default Layout;
