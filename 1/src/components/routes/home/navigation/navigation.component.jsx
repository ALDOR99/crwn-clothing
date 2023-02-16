import { Outlet, Link } from "react-router-dom";

import { Fragment, useContext } from "react";

import CartIcon from "../../../cart-icon/cart-icon.compenent";

import CartDropdown from "../../../cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../../../assets/crown.svg";

import { UserContext } from "../../../../contexts/user.context";
import { CartContext, CartProvider } from "../../../../contexts/cart.context";

import { signOutUser } from "../../../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

//--------------------------------------------------------------------------------

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign-In
            </Link>
          )}

          <CartIcon />
        </div>

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

//--------------------------------------------------------------------------------

export default Navigation;
