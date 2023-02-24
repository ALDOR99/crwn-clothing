import { Outlet, Link } from "react-router-dom";

import { Fragment, useContext } from "react";

import CartIcon from "../../../cart-icon/cart-icon.compenent";

import CartDropdown from "../../../cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../../../assets/crown.svg";

import { UserContext } from "../../../../contexts/user.context";
import { CartContext, CartProvider } from "../../../../contexts/cart.context";

import { signOutUser } from "../../../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

//--------------------------------------------------------------------------------

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign-In</NavLink>
          )}

          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

//--------------------------------------------------------------------------------

export default Navigation;
