import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { customerLogin } from "../../actions/customerActions";
import { useNavigate } from "react-router-dom";
function CustomerAccountLogin({
  hideCustomerLoginFunc,
  navigateDestination,
  titleText,
}) {
  // LOGIN SUCCESS CONTAINER👇
  const loginSuccessContainer = (
    <div className="customer__account__login__success">
      <div className="customer__account__login__container">
        {/* FIRST PART👇👇 */}
        <div className="customer__account__login__first__part">
          <div></div>
          <div className="customer__account__login__title">Welcome Back</div>
          <div
            onClick={() => {
              // hideCustomerLoginFunc();
            }}
            className="login__close__icon"
          >
            <CloseOutlinedIcon></CloseOutlinedIcon>
          </div>
        </div>

        {/*  SECOND PART👇👇*/}
        <div className="customer__account__login__second__part">
          <div className="complete__login__icon__container">
            <CheckCircleIcon
              sx={{ fontSize: 100 }}
              fontSize="large"
              color="success"
            ></CheckCircleIcon>
          </div>
          <div className="you__are__in__text">You're In!</div>
          <div className="after__logged__continue__button">Continue</div>
        </div>
      </div>
    </div>
  );
  let navigate = useNavigate();
  const [showHideLoginSuccessContainer, setShowHideLoginSuccessContainer] =
    useState(false);

  // states for the user

  const responseGoogle = (response) => {
    console.log("=======google response=============================");
    console.log(response);
    console.log("====================================");
    if (response.profileObj.email) {
      dispatch(
        customerLogin(
          response && response.profileObj.email,
          response && response.profileObj.givenName,
          response && response.profileObj.familyName
        )
      );
    }
    // response &&
    //   dispatch(
    //     customerLogin(
    //       response && response.profileObj.email,
    //       response && response.profileObj.givenName,
    //       response && response.profileObj.familyName
    //     )
    //   );
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo !== null) {
      navigate(navigateDestination);
      if (userInfo) {
        hideCustomerLoginFunc(false);
        window.location.reload();
      }
    }
  }, [navigate, userInfo, hideCustomerLoginFunc, navigateDestination]);
  return (
    <div className="customer__account__login">
      {showHideLoginSuccessContainer === true ? loginSuccessContainer : null}
      <div className="customer__account__login__container">
        {/* FIRST PART👇👇 */}
        <div className="customer__account__login__first__part">
          <div></div>
          <div className="customer__account__login__title">{titleText}</div>
          <div
            onClick={() => {
              hideCustomerLoginFunc();
            }}
            className="login__close__icon"
          >
            <CloseOutlinedIcon></CloseOutlinedIcon>
          </div>
        </div>

        {/*  SECOND PART👇👇*/}
        <div className="customer__account__login__second__part">
          {/* <div className="social__auth__div fb__login__button">
            <img
              src="https://i.imgur.com/PWKbT0S.png"
              alt="google logo"
              height="25px"
              className="social__image"
            />
            <div className="">
              <FacebookLogin
                appId="420016653150866"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="fb__login__inside"
                  >
                    Login With Facebook
                  </button>
                )}
              />
            </div>{" "}
          </div>
          <div className="login__or__text">or</div> */}

          <div>
            <GoogleLogin
              clientId="1087052669272-2l667qrkq4t1fvglvlfvdnk79o4133l0.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google__login__inside"
                >
                  {" "}
                  <div className="social__auth__div google__login__button">
                    <img
                      src="https://i.imgur.com/97kScye.png"
                      alt="fb logo"
                      height="25px"
                      className="social__image"
                    />
                    Log In With Google{" "}
                  </div>
                </button>
              )}
              buttonText="Log In With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccountLogin;
