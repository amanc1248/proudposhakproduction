import React, { useEffect } from "react";
import HeaderSpacer from "../../components/HeaderSpacer";
import ProductContainer from "../../components/ProductContainer";
import "../../Styles/customer/categoryScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryProductDetailsAction } from "../../actions/productActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CategoryScreen() {
  let { categoryId } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const categoryProducts = useSelector((state) => state.categoryProducts);
  const { categoryProductDetails } = categoryProducts;
  const categoryTypes = categoryProductDetails && categoryProductDetails[0];
  const categoryTypesRawProducts =
    categoryProductDetails && categoryProductDetails[1];

  useEffect(() => {
    dispatch(categoryProductDetailsAction(categoryId));
  }, [categoryId, dispatch]);

  // let categoryTypes = [];
  // const gettingAllCategoryTypes = {categoryProductDetails.map((categoryObj)=>{
  //  ca categoryObj.cultural_dress_category
  // })}
  console.log("=======categoryTypes=========");
  console.log(categoryProductDetails && categoryTypes);
  console.log("====================================");
  console.log("=======categoryTypesRaw=========");
  console.log(categoryProductDetails && categoryTypesRawProducts);
  console.log("====================================");

  const categoryTypesProducts = [];
  const productTypesCategoryAddingFunction = () => {
    categoryProductDetails &&
      categoryTypes.map((obj1) => {
        let array1 = [];
        categoryTypesRawProducts.map((obj2) => {
          if (obj1.sub_category_id === obj2.sub_category_id) {
            if (array1.length < 11) {
              array1.push({
                product_id: obj2.product_id,

                image: obj2.product_shop_image,
                name: obj2.name,
                price: obj2.price,
              });
            }
          }
        });
        categoryTypesProducts.push(array1);
      });
  };
  productTypesCategoryAddingFunction();
  console.log("========================categoryTypesProducts============");
  console.log(categoryTypesProducts && categoryTypesProducts);
  console.log("====================================");
  return (
    <div>
      <HeaderSpacer></HeaderSpacer>

      <div className="category__image__title__container">
        <div
          className="category__image__title__container__bg__image"
          style={{
            backgroundImage: `url(${
              categoryTypes && categoryTypes[0].product_category_image
            })`,
          }}
        >
          <div className="category__image__title">
            {categoryTypes && categoryTypes[0].product_category_description}
          </div>
        </div>
      </div>

      {/* unique products buttons under this category */}
      <div className="unique__products__buttons__list__under__a__category">
        {categoryTypes &&
          categoryTypes.map((categoryObj) => {
            return (
              <button
                className="unique__product__button__category"
                onClick={() => {
                  navigate(
                    `/collections/${categoryObj.name}/${categoryObj.id}`
                  );
                }}
              >
                {categoryObj.name}
              </button>
            );
          })}
      </div>

      {/* unique products list under a category */}

      {categoryTypes &&
        categoryTypes.map((categoryObj, index) => {
          return (
            <div className="products__list__under__category">
              <div className="unique__product__individual__under__category">
                <div className="unique__product__individual__title">
                  {categoryObj.name}
                </div>
                <div className="unique__product__category__image__container row p-0 m-0">
                  {/* 1. unique product description column👇 */}
                  <div className="unique__product__description__outer col-lg-3 col-md-3 col-6">
                    <div className="unique__product__description__container">
                      <img
                        className="unique__product__description__image"
                        src={categoryObj.image}
                        alt="categoryimg"
                      />
                      <div className="unique__product__description__text">
                        {categoryObj.description}
                      </div>
                      <div>
                        <button
                          className="unique__product__description__shop__all__button"
                          onClick={() => {
                            navigate(
                              `/collections/${categoryObj.name}/${categoryObj.id}`
                            );
                          }}
                        >
                          Shop All
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. individual product column👇 */}

                  {categoryTypesProducts &&
                    categoryTypesProducts[index].map((categoryProductObj) => {
                      return (
                        <ProductContainer
                          id={categoryProductObj.product_id}
                          image={categoryProductObj.image}
                          name={categoryProductObj.name}
                          price={categoryProductObj.price}
                        ></ProductContainer>
                      );
                    })}
                  <div className="list__end__shop__all__button__container">
                    <button
                      className="list__end__shop__all__button"
                      onClick={() => {
                        navigate(
                          `/collections/${categoryObj.name}/${categoryObj.sub_category_id}`
                        );
                      }}
                    >
                      Shop All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CategoryScreen;
