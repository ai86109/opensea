import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

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
      color: rgba(46, 68, 78, 1);
    }
  }
  & a {
    display: block;
    color: ${props => props.focus ? 'rgba(46, 68, 78, 1)' : 'rgba(46, 68, 78, 0.5)'};
    font-size: 20px;
    font-weight: 800;
  }
  & + & {
    margin-left: 10px;
    @media screen and (min-width: 768px) {
      margin-left: 30px;
    }
  }
`

function Layout() {
  let pathname = useLocation().pathname
  return (
    <AppWrapper>
      <NavWrapper>
        <NavBlock focus={pathname === '/listing'}><Link to="/listing">ListingPage</Link></NavBlock>
        <NavBlock focus={pathname === '/watchlist'}><Link to="/watchlist">WatchlistPage</Link></NavBlock>
      </NavWrapper>
      <Outlet/>
    </AppWrapper>
  );
}

export default Layout;
