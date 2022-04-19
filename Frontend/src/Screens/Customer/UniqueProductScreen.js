import React, { useEffect } from "react";
import HeaderSpacer from "../../components/HeaderSpacer";
import ProductContainer from "../../components/ProductContainer";
import "../../Styles/customer/UniqueProductScreen.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subCategoryProductDetailsAction } from "../../actions/productActions";

function UniqueProductScreen() {
  let { subCategoryName, subCategoryId } = useParams();

  const subCategoryProducts = useSelector((state) => state.subCategoryProducts);
  const { subCategoryProductDetails } = subCategoryProducts;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subCategoryProductDetailsAction(subCategoryName, subCategoryId));
  }, [subCategoryName, subCategoryId, dispatch]);

  console.log("====================================");
  console.log(subCategoryProductDetails);
  console.log("====================================");
  return (
    <div>
      <HeaderSpacer></HeaderSpacer>

      <div className="unique__product__page__container">
        <div className="unique__product__container__title">
          {subCategoryName}
          <div className="sub__category__description">
            Available In All Sizes
          </div>
        </div>
      </div>
      <div className="unique__product__category__image__container row p-0 m-0">
        {subCategoryProductDetails &&
          subCategoryProductDetails.map((obj) => {
            return (
              <ProductContainer
                id={obj.product_id}
                name={obj.name}
                price={obj.price}
                image={obj.product_shop_image}
              ></ProductContainer>
            );
          })}
        {/* <ProductContainer></ProductContainer>
       
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer>
        <ProductContainer></ProductContainer> */}
      </div>
    </div>
  );
}

export default UniqueProductScreen;
