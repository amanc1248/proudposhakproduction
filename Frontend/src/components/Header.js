import React, { useState, useEffect } from "react";
import "../Styles/components/header.css";
import "../Styles/customer/homepage.css";

import { Nav, Navbar } from "react-bootstrap";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CustomerCart from "../Screens/CustomerAccount/CustomerCart";
import CustomerAccountLogin from "../Screens/CustomerAccount/CustomerAccountLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productCategoriesDetailsAction } from "../actions/productActions";

function Header() {
  let navigate = useNavigate();

  // cart state👇
  const [showHideCart, setShowHideCart] = useState(false);
  const hideShowHideCart = () => {
    setShowHideCart(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();

  // check if user is logged in
  const ifUserLoggedIn = () => {
    if (userInfo) {
      navigate("/account");
    } else {
      setShowHideLogin(true);
    }
  };
  // show hide login container
  const [showHideLogin, setShowHideLogin] = useState(false);
  const closeLogin = () => {
    setShowHideLogin(false);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("Cart Items for bag 👇👇👇");
  console.log(cartItems);

  // For total cart Items
  const getTotalCartItems = () => {
    let totalCartItems = 0;
    cartItems.forEach((item) => {
      return (totalCartItems += parseInt(item.quantity));
    });

    return totalCartItems;
  };

  // product categories
  const productCategories = useSelector((state) => state.productCategories);
  const { productCategoriesDetails } = productCategories;

  console.log(productCategoriesDetails);

  useEffect(() => {
    dispatch(productCategoriesDetailsAction());
  }, [dispatch]);
  return (
    <>
      {" "}
      {showHideCart && (
        <CustomerCart hideCustomerCartFunc={hideShowHideCart}></CustomerCart>
      )}
      {showHideLogin && (
        <CustomerAccountLogin
          hideCustomerLoginFunc={closeLogin}
          navigateDestination={"/account"}
          titleText={"Login"}
        ></CustomerAccountLogin>
      )}
      <div className="the__navbar__container ">
        <Navbar
          // onClick={() => {
          //   setNavbarColor(true);
          // }}
          expand="lg"
          bg="white"
          className="the__navbar"
        >
          <Navbar.Toggle
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="">
              {/* <i className="fas fa-bars hamburger"></i> */}
              <MenuIcon className="hamburger__icon"></MenuIcon>
            </span>
          </Navbar.Toggle>
          <Navbar.Brand href="/" className={"navbar__brand"}>
            PROUD POSHAK
          </Navbar.Brand>
          {/* INside the navbar.collapse will be everything which will be collapsed */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="text-md-end order-lg-0 order-last "
          >
            <Nav className="nav__links">
              {productCategoriesDetails &&
                productCategoriesDetails.map((obj) => {
                  return (
                    <Nav.Link
                      href={`/category/${obj.product_category_name}/${obj.product_category_id}`}
                    >
                      {" "}
                      <span className="nav__link">
                        {obj.product_category_name}
                      </span>
                    </Nav.Link>
                  );
                })}
            </Nav>
          </Navbar.Collapse>

          <Nav.Link className="the__header__icon ">
            <PersonOutlineOutlinedIcon
              className="nav__icon"
              onClick={ifUserLoggedIn}
            ></PersonOutlineOutlinedIcon>
          </Nav.Link>
          <Nav.Link
            className="the__header__icon the__cart__header "
            onClick={() => {
              setShowHideCart(!showHideCart);
            }}
          >
            <ShoppingBagOutlinedIcon className="nav__icon"></ShoppingBagOutlinedIcon>
            {getTotalCartItems() !== 0 ? (
              <div className="no__of__cart__items">
                <span className="the__cart__number">{getTotalCartItems()}</span>
              </div>
            ) : null}
          </Nav.Link>
        </Navbar>
      </div>
    </>
  );
}
export default Header;
