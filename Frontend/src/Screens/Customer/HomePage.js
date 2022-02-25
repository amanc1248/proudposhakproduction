import React, { useEffect } from "react";
import "../../Styles/components/header.css";
import "../../Styles/customer/homepage.css";

import HeaderSpacer from "../../components/HeaderSpacer";
import { useDispatch, useSelector } from "react-redux";
import {
  productCategoriesDetailsAction,
  productSubCategoriesDetailsAction,
} from "../../actions/productActions";
function HomePage() {
  const dispatch = useDispatch();

  // product categories
  const productCategories = useSelector((state) => state.productCategories);
  const { productCategoriesDetails } = productCategories;

  console.log("=========productCategories===============");
  console.log();
  console.log("====================================");
  console.log(productCategoriesDetails);

  // product subcategories
  const productSubCategories = useSelector(
    (state) => state.productSubCategories
  );
  const { productSubCategoriesDetails } = productSubCategories;

  console.log(productSubCategoriesDetails);
  useEffect(() => {
    dispatch(productCategoriesDetailsAction());
    dispatch(productSubCategoriesDetailsAction());
  }, [dispatch]);
  return (
    <div>
      <HeaderSpacer></HeaderSpacer>

      <div
        className="theBackgroundImageHomePage"
        style={{
          backgroundImage: `url("https://i.imgur.com/PUHLcho.png")`,
        }}
      >
        <div className="background__img__div__title">
          Free Delivery All Over Nepal
        </div>
        <div className="categories__buttons__main">
          {productCategoriesDetails &&
            productCategoriesDetails.map((obj) => {
              return (
                <div>
                  <a
                    href={`/category/${obj.product_category_name}/${obj.product_category_id}`}
                  >
                    <button className="category__button">
                      Shop {obj.product_category_name}
                    </button>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
      <div className="slogan__text">Our Poshak = Our Pride</div>
      {/* unique product categories */}
      <div className="unique__product__categories row p-0 m-0">
        {productSubCategoriesDetails &&
          productSubCategoriesDetails.map((obj) => {
            return (
              <div className="unique__product__container__outer col-lg-3 col-md-3 col-6">
                <a href={`/collections/${obj.name}/${obj.id}`}>
                  <div className="unique__product__container">
                    <div className="unique__product__title">{obj.name}</div>

                    <img
                      className="unique__product__container__image"
                      src={obj.image}
                      alt=""
                    />
                  </div>
                </a>
              </div>
            );
          })}
      </div>

      {/* about achara section */}
      <div className="row no-gutters p-0 m-0">
        <div className="col-lg-7 col-sm-12">
          <img
            src="https://i.imgur.com/f50LBGZ.png"
            alt="about achara"
            className="about__achara__image"
          />
        </div>
        <div className="col-lg-5 col-sm-12 ">
          <div className="about__achara__container">
            <div className="about__achara__title">
              An initiative to save our Tharu cultural dress and give joy of
              working from home to tailors.
            </div>
            <div className="about__achara__description">
              We make our beautiful cultural dress, Achara, at home with the
              help of well experienced tailors. Every order is taken as our
              pride to save our culture. We make the prefect Achara for your
              size with proper and accurate thread and highest quality cloth,
              Bombay Wear.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
