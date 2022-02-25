import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import "../../Screens/Footer/FooterFAQs/FooterFAQ.css";
import "../../Styles/components/Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  let navigate = useNavigate();

  return (
    <div className="">
      <div className="website__footer  no-gutters">
        <div className=" secondSectionFooter">
          <div className="row no-gutters">
            {/* lets grow together section 👇*/}
            <div className="col-lg-3 col-md-3 col-12 footer__links__container">
              <div className="followUsTitle">START SELLING ACHARA WITH US</div>
              {/* <p className=" " style={{ color: "white" }}>
                Start Selling Anchara
              </p> */}
              <button className="get__started__tailor">
                call +9779811095835
              </button>
              {/* <Link to="/employeeSignIn">
                <p className="footer__link">Be Employee</p>
              </Link> */}
            </div>

            {/* Need help section 👇 */}
            <div className="col-lg-3 col-md-3 col-6 footer__links__container">
              <div className="followUsTitle">NEED HELP</div>
              {/* <Link to="/contactUs" style={{ textDecoration: "none" }}>
                <p className="footer__link ">Contact Us</p>
              </Link> */}
              <a href="/faqs" style={{ textDecoration: "none" }}>
                <p className="footer__link">Shipping Service</p>
              </a>
              <a href="/faqs" style={{ textDecoration: "none" }}>
                <p className="footer__link ">Payment Options</p>
              </a>
            </div>

            {/* The Company Section👇 */}
            <div className="col-lg-3 col-md-3 col-6 footer__links__container">
              <div className="followUsTitle">THE COMPANY</div>
              <a href="/aboutus" style={{ textDecoration: "none" }}>
                <p className="footer__link">About ProudPoshak</p>
              </a>

              {/* <p className="footer__link">Legal</p>
              <p className="footer__link">Privacy Policy</p> */}
            </div>

            {/* Find us on seciton 👇 */}
            <div className="col-lg-3 col-md-3 col-12 footer__links__container middle__links__container">
              <div className="followUsTitle">FIND US ON</div>
              <div className="socialMediaIcons">
                <a href="https://www.facebook.com/ProudPoshakcom-106177408459055/">
                  <FacebookIcon className="socialIcon"></FacebookIcon>
                </a>

                <a href="https://www.youtube.com/channel/UCfVQThXgwVe5FIAwLRvF-cQ">
                  <YouTubeIcon className="socialIcon"></YouTubeIcon>
                </a>
                <a href="https://www.instagram.com/proudposhak/">
                  <InstagramIcon className="socialIcon"></InstagramIcon>
                </a>

                {/* <TwitterIcon className="socialIcon"></TwitterIcon> */}
              </div>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-3 col-6 footer__links__container middle__links__container">
              <div className="followUsTitle">CONTACT US AT</div>

              <p className="footer__link">+9779811095835</p>
              <p className="footer__link">proudposhak@gmail.com</p>
              <p className="footer__link">support@proudposhak.com</p>
            </div>
            {/* <div className="col-lg-3 col-md-3 col-6 footer__links__container middle__links__container">
                <div className="followUsTitle">WEBSITE GUIDE </div>

                <a
                  href="https://www.youtube.com/channel/UCfVQThXgwVe5FIAwLRvF-cQ"
                  style={{ textDecoration: "none" }}
                >
                  <p className="footer__link">How to use website?</p>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCfVQThXgwVe5FIAwLRvF-cQ"
                  style={{ textDecoration: "none" }}
                >
                  <p className="footer__link">How to place an order?</p>
                </a>
              </div> */}
          </div>

          <div className="row no-gutters payment__methods__footer">
            <div className="payment__gateways__title">
              PAYMENT GATEWAYS WE ACCEPT
            </div>
            <div className="">
              <img
                src="https://i.imgur.com/RopvzHC.png"
                title="source: imgur.com"
                alt="esewa"
                className="payment__gateway__image"
              />
              <img
                src="https://i.imgur.com/TrqFdPa.jpg"
                title="source: imgur.com"
                alt="khalti"
                className="payment__gateway__image"
              />
              <img
                src="https://i.imgur.com/FOO577i.jpg"
                title="source: imgur.com"
                alt="bank transfer"
                className="payment__gateway__image"
              />

              <img
                src="https://i.imgur.com/ktzuV4V.png"
                title="source: imgur.com"
                alt="cashondelivery"
                className="payment__gateway__image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
