import React, { useEffect } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomerAccountLogin from "./CustomerAccountLogin";
import { productCategoriesDetailsAction } from "../../actions/productActions";

function CustomerCart({ hideCustomerCartFunc }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("Cart Items for bag 👇👇👇");
  console.log(cartItems);
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  // product categories
  const productCategories = useSelector((state) => state.productCategories);
  const { productCategoriesDetails } = productCategories;

  console.log("=========productCategories===============");
  console.log(productCategoriesDetails);
  console.log("====================================");

  useEffect(() => {
    dispatch(productCategoriesDetailsAction());
  }, [dispatch]);
  // Calculating the total price 👇👇
  const getTotalPrice = () => {
    // Here while calculating the total price why Naz has not converted the price which is in string into the integer
    var theTotalPrice = 0;
    cartItems.map((item) => {
      return (theTotalPrice += item.total_price);
    });
    return theTotalPrice;
  };

  // For total cart Items
  const getTotalCartItems = () => {
    let totalCartItems = 0;
    cartItems.forEach((item) => {
      return (totalCartItems += parseInt(item.quantity));
    });

    return totalCartItems;
  };

  // show hide login container
  const [showHideLogin, setShowHideLogin] = useState(false);
  const closeLogin = () => {
    setShowHideLogin(false);
  };

  const showShowHideLogin = () => {
    setShowHideLogin(true);
  };

  // checkout handler
  const checkOutHandler = () => {
    if (userInfo) {
      navigate("/checkout");

      if (userInfo) {
      }
    } else {
      showShowHideLogin();
    }
  };
  return (
    <>
      {showHideLogin && (
        <CustomerAccountLogin
          hideCustomerLoginFunc={closeLogin}
          navigateDestination={"/checkout"}
          titleText={"Login Before CheckOut"}
        ></CustomerAccountLogin>
      )}
      <div className="customer__cart__container">
        <div className="customer__cart__uppper__part">
          <div className="customer__cart__icon">
            <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
            {getTotalCartItems() !== 0 ? (
              <div className="no__of__cart__items__div">
                <span className="the__cart__number__div">
                  {getTotalCartItems()}
                </span>
              </div>
            ) : null}
          </div>
          <div className="customer__cart__title">Shopping Bag</div>
          <div
            className="close__customer__cart"
            onClick={() => {
              hideCustomerCartFunc();
            }}
          >
            <CloseOutlinedIcon></CloseOutlinedIcon>
          </div>
        </div>
        {/* {cartItems !== [] ? (
        <div> */}

        <div className="customer__cart__middle__part">
          {cartItems &&
            cartItems.map((cartItem) => (
              <CustomerCartProduct cartItem={cartItem}></CustomerCartProduct>
            ))}
        </div>
        {cartItems.length === 0 && (
          <div className="no__cart__items__condition">
            <div className="no__cart__items">Your Bag Is Empty</div>
            <div className="shop__men__women__kids__button__container">
              {productCategoriesDetails &&
                productCategoriesDetails.map((obj) => {
                  return (
                    <a
                      href={`/category/${obj.product_category_name}/${obj.product_category_id}`}
                    >
                      <div className="category__cart__button">
                        <button className="shop__men__women__button">
                          Shop {obj.product_category_name}
                        </button>
                      </div>
                    </a>
                  );
                })}
              {/* <div className="shop__men__women__button">
                {" "}
                <a href="/category/Women/1">Shop Women</a>
              </div>
              <div className="shop__men__women__button">Shop Kids</div> */}
            </div>
          </div>
        )}

        {cartItems.length !== 0 ? (
          <div className="customer__cart__last__part">
            <button className="checkout__button" onClick={checkOutHandler}>
              Checkout - Rs. {getTotalPrice()}
            </button>
            <div>
              <button
                className="continue__shopping__button"
                onClick={() => {
                  hideCustomerCartFunc();
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default CustomerCart;

function CustomerCartProduct({ cartItem }) {
  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(removeFromCart(cartItem));
  };
  return (
    <div className="customer__cart__product__container">
      <div className="customercartproduct__firstpart">
        <img
          src={cartItem.image}
          alt="cart__product"
          height="80px"
          className="cart__image"
        />
        <div className="cart__product__name">{cartItem.product_name}</div>
        <div className="cart__product__price">
          <div>Rs. {cartItem.total_price}</div>
          <div>Qty: {cartItem.quantity}</div>
        </div>
      </div>
      <div className="customer__cart__second__part">
        {cartItem.product_types.map((obj) => {
          return (
            <div className="customer__cart__product__type__container">
              <div className="product__types__name">
                {obj.product_type_name}
              </div>
              <div className="attribute__name__value__container">
                {obj.attributes.map((attObj) => {
                  return (
                    <div className="attribute__name__value">
                      <div className="attri__name">{attObj.attribute_name}</div>
                      <div className="attri__name">
                        {attObj.attribute_value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="remove__cart__item">
        <DeleteIcon
          className="remove__cart__item__icon"
          onClick={removeItemHandler}
        ></DeleteIcon>
        {/* <span className="delete__item__text">Delete Item</span> */}
      </div>
      <hr />
    </div>
  );
}
