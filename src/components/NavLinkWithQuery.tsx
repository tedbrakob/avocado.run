import { NavLink, useLocation } from 'react-router-dom';

export const NavLinkWithQuery = ({ children, to, ...props }) => {
  const { search } = useLocation();

  return (
    <NavLink to={to + search} {...props}>
      {children}
    </NavLink>
  );
};