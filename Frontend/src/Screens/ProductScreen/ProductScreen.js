import React, { useEffect, useState } from "react";
import HeaderSpacer from "../../components/HeaderSpacer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/ProductScreen/ProductScreen.css";
import {
  ProductDetailsClass,
  ProductTypeClass,
  ProductAttributesClass,
  ProductAttributeValue,
  ProductAttributeDescription,
} from "./ProductClasses/ProductClasses";
import { productScreenProductDetailsAction } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import Loader from "../../components/Loader";
import CustomerCart from "../CustomerAccount/CustomerCart";
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
function ProductScreen() {
  let { productId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productScreenProductDetailsAction(productId));
  }, [dispatch, productId]);
  // for fetching productDetails
  const productScreenProductDetails = useSelector(
    (state) => state.productScreenProductDetails
  );
  const { loading, productScreenDetails } = productScreenProductDetails;
  const allProductDetails = productScreenDetails && productScreenDetails[0];
  const allProductTypesDetails =
    productScreenDetails && productScreenDetails[2];
  const allProductTypesSizeAttributes =
    productScreenDetails && productScreenDetails[3];

  //FIRST LOG
  console.log("000=========productScreenDetails ");
  console.log(productScreenDetails);
  console.log("====================================");

  //1. THE PRODUCT DETAILS EXCEPT IMAGES👇👇
  const productDetails = new ProductDetailsClass({
    id: allProductDetails && allProductDetails[0].product_id,
    name: allProductDetails && allProductDetails[0].name,
    description: allProductDetails && allProductDetails[0].description,
    price: allProductDetails && allProductDetails[0].price,
    image: allProductDetails && allProductDetails[0].product_shop_image,
    seller_id: allProductDetails && allProductDetails[0].seller_id,
    unique_product_id:
      allProductDetails && allProductDetails[0].unique_product_id,
  });
  console.log("1111==============productdetails");
  console.log(productDetails);
  console.log("====================================");

  // 2. PRODUCT IMAGES 👇👇
  // const pIInAllString =
  //   allProductDetails && allProductDetails[0].product_images;
  // const pIInAllArray = pIInAllString && pIInAllString.split(",");
  let productImages = productScreenDetails && productScreenDetails[1];
  // const productImagesAddingFnc = () => {
  //   pIInAllArray &&
  //     pIInAllArray.map((obj) => {
  //       return productImages.push(new ProductImagesClass({ product_url: obj }));
  //     });
  // };
  // productImagesAddingFnc();

  console.log("2222===============productImages");
  console.log(productImages);
  console.log("====================================");

  // 3. PRODUCT TYPES 👇👇
  let productTypes = [];
  const productTypesAddingFnc = () => {
    allProductTypesDetails &&
      allProductTypesDetails.map((obj, index) => {
        return productTypes.push(
          new ProductTypeClass({
            id:
              allProductTypesDetails &&
              allProductTypesDetails[index].product_type_id,
            product_type_name:
              allProductTypesDetails && allProductTypesDetails[index].name,
          })
        );
      });
  };
  productTypesAddingFnc();
  console.log("3333=============productTypes");
  console.log(productTypes);
  console.log("====================================");

  // PRODUCT TYPES SIZE ATTRIBUTES👇👇👇
  let productTypesSizeAttributesList = [];
  const uniqueProductTypeIds = [
    ...new Set(
      allProductTypesSizeAttributes &&
        allProductTypesSizeAttributes.map((item) => item.product_type_id)
    ),
  ];
  uniqueProductTypeIds.map((uidObj) => {
    let iArray = [];
    allProductTypesSizeAttributes &&
      allProductTypesSizeAttributes.filter(function (obj) {
        if (obj.product_type_id === uidObj) {
          // for attribute values
          let attributeValues =
            obj.attribute_value && obj.attribute_value.split(",");
          let attributeValuesArray = [];
          attributeValues.map((obj) => {
            return attributeValuesArray.push(
              new ProductAttributeValue({
                attributeValue: obj,
                isSelected: false,
              })
            );
          });
          obj.attribute_value = attributeValuesArray;

          // for attribute value description
          let attributeValueDescription =
            obj.attribute_value_description &&
            obj.attribute_value_description.split(",");
          let attributeValuesDescriptionArray = [];
          attributeValueDescription.map((obj) => {
            return attributeValuesDescriptionArray.push(
              new ProductAttributeDescription({ attributeDescription: obj })
            );
          });
          obj.attribute_value_description = attributeValuesDescriptionArray;

          iArray.push(
            new ProductAttributesClass({
              product_type_id: obj.product_type_id,
              attribute_id: obj.size_attributes_id,
              attribute_name: obj.attribute_name,
              product_type_method_id: obj.product_type_method_id,
              product_type_type_id: obj.product_type_type_id,
              product_type_unit_id: obj.product_type_unit_id,
              attribute_gif_url: obj.attribute_gif_url,
              attribute_youtube_video: obj.attribute_youtube_video,
              attribute_value_description_id:
                obj.attribute_value_description_id,
              attribute_value: obj.attribute_value,
              attribute_description: obj.attribute_value_description,
              price_per_m: obj.price_per_m,
            })
          );
        }
      });
    if (iArray !== []) {
      productTypesSizeAttributesList.push(iArray);
    }
  });
  console.log("4444===========productTypeSizeAttributes");
  console.log(productTypesSizeAttributesList);
  console.log("====================================");

  // the prices
  const [thePrices, setThePrices] = useState();
  console.log("====================================theprices");
  console.log(thePrices);
  console.log("====================================");
  return loading ? (
    <Loader></Loader>
  ) : (
    <div>
      <HeaderSpacer></HeaderSpacer>
      <div className="product__screen__container row p-0 m-0 no-gutters">
        <div className="product__images__container col-lg-6 col-md-6 col-sm-12">
          {allProductTypesSizeAttributes && (
            <ProductImages
              productImages={productImages && productImages}
            ></ProductImages>
          )}
        </div>
        <div className="product__details__container col-lg-6 col-md-6 col-sm-12">
          <ProductDetails productDetails={productDetails}></ProductDetails>

          {allProductTypesSizeAttributes && (
            <ProductTypesTable
              productTypesSizeAttributesList={
                productTypesSizeAttributesList && productTypesSizeAttributesList
              }
              productTypes={productTypes}
              productDetails={productDetails}
            ></ProductTypesTable>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;

function ProductImages({ productImages }) {
  // const productById = useSelector((state) => state.productById);
  // const { theProduct } = productById;
  // const theProduct = productById && productById.theProduct;
  const [loaded, setLoaded] = useState(false);

  const [index, setIndex] = useState(0);

  const product_url = productImages && productImages[index].product_url;
  // console.log(product_url);
  const checkNumber = (number) => {
    if (number > productImages.length - 1) {
      return 0;
    }
    if (number < 0) {
      return productImages.length - 1;
    }
    return number;
  };
  const nextPerson = (resetTransform) => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
    resetTransform();
  };
  const prevPerson = (resetTransform) => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
    resetTransform();
  };
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * productImages.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
  };

  return (
    <div className="">
      <div className="the__product__image__container">
        {" "}
        {loaded ? null : <div className="animated__div"> Image...</div>}
        <TransformWrapper
          // initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div
                className="image__previous__button"
                onClick={() => {
                  prevPerson(resetTransform);
                }}
              >
                <ChevronLeftOutlinedIcon className="next__prev__icon"></ChevronLeftOutlinedIcon>
              </div>
              <div
                className="image__next__button"
                onClick={() => {
                  nextPerson(resetTransform);
                }}
              >
                <ChevronRightOutlinedIcon className="next__prev__icon"></ChevronRightOutlinedIcon>
              </div>
              <div className="zoom__image__component">
                <div className="zoom__in__tools">
                  <button
                    onClick={() => zoomIn()}
                    className="zoom__tools__button btn btn-primary"
                  >
                    Zoom In +
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="zoom__tools__button btn btn-secondary"
                  >
                    Zoom Out-
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="zoom__tools__button btn btn-danger"
                  >
                    Reset x
                  </button>
                </div>
                <TransformComponent>
                  <img
                    // style={loaded === false ? { display: "none" } : {}}
                    className="d-block w-100 product__individual__carousel__image "
                    src={productImages && product_url}
                    alt=""
                    onLoad={() => setLoaded(true)}
                    // height="200px"
                  />
                </TransformComponent>
              </div>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}

function ProductDetails({ productDetails }) {
  return (
    <div>
      <div className="product__name">{productDetails.name}</div>
      {/* <div className="product__description">{productDetails.description}</div> */}
      <div className="product__price">Rs.{productDetails.price}</div>

      <hr />
      <div className="size__table">SIZE TABLE</div>
    </div>
  );
}

function ProductTypesTable({
  productDetails,
  productTypes,
  productTypesSizeAttributesList,
}) {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [subValue, setSubValue] = useState({});

  // product_type_id
  let combinedProductTypesAndAttributes = [];
  let calculatedPrice = [];
  const calculatingTotalPrice = () => {
    productTypes.map((pObj, pIndex) => {
      let tp = 0;
      combinedProductTypesAndAttributes.push({
        product_type_id: pObj.id,
        product_type_name: pObj.product_type_name,
      });
      combinedProductTypesAndAttributes[pIndex].attributes = [];
      Object.values(subValue).map((sObj) => {
        if (pObj.id === sObj.product_type_id) {
          tp += sObj.attribute_price;
          combinedProductTypesAndAttributes[pIndex].attributes.push({
            attribute_name: sObj.attribute_name,
            attribute_value: sObj.attribute_value,
          });
        }
      });
      calculatedPrice.push(tp);
    });
  };

  calculatingTotalPrice();

  // quantity selected value
  const [quantitySelected, setQuantitySelected] = useState(1);

  const requiredNoOfField = () => {
    let totalNo = 0;
    productTypesSizeAttributesList.map((obj) => {
      totalNo += obj.length;
    });
    console.log("=================totlano===========");
    console.log(parseInt(totalNo));
    console.log("====================================");
    return parseInt(totalNo);
  };
  requiredNoOfField();
  // ADDING TO CART FUNCTION
  const addToCartFunction = () => {
    console.log("=============our values==============");
    console.log(Object.values(subValue).length);
    console.log(requiredNoOfField());

    console.log("====================================");
    if (
      Object.values(subValue).length === requiredNoOfField() &&
      quantitySelected
    ) {
      setMessage();
      dispatch(
        addToCart({
          product_id: productDetails.id,
          product_name: productDetails.name,
          total_price: theTotalProductPrice(
            calculatedPrice,
            productDetails.price,
            quantitySelected
          ),
          unique_product_id: productDetails.unique_product_id,
          seller_id: productDetails.seller_id,
          image: productDetails.image,
          quantity: quantitySelected,
          product_types: combinedProductTypesAndAttributes,
        })
      );
      setShowHideCart(true);
    } else {
      setMessage("Select All The Required Field First");
    }
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("Cart Items for bag 👇👇👇");
  console.log(cartItems);
  // cart state👇
  const [showHideCart, setShowHideCart] = useState(false);
  const hideShowHideCart = () => {
    setShowHideCart(false);
  };

  const [message, setMessage] = useState();
  return (
    <>
      {showHideCart && (
        <CustomerCart hideCustomerCartFunc={hideShowHideCart}></CustomerCart>
      )}
      <div>
        <div className="size__table__product__types__attributes__container">
          <div className="size__table__product__types__container">
            {productTypes.map((obj, index) => {
              return (
                <ProductTypesTableTabs
                  index={index}
                  name={obj.product_type_name}
                ></ProductTypesTableTabs>
              );
            })}
          </div>
          <div className="size__table__attributes">
            {/* {ProductSizeAttribtutesDivs[value]} */}
            <ProductSizeAttribtutes
              productTypesSizeAttributes={productTypesSizeAttributesList[value]}
              value={subValue}
              setValue={setSubValue}
            ></ProductSizeAttribtutes>
          </div>
          <div className="total__price__of__size__attribute">
            Total {productTypes[value].product_type_name} Price:{" "}
            <span className="price__text">Rs. {calculatedPrice[value]}</span>
          </div>
        </div>
        <hr />
        <SelectingQuantityFunction
          quantitySelected={quantitySelected}
          setQuantitySelected={setQuantitySelected}
        ></SelectingQuantityFunction>

        {message && <Message variant="danger">{message}</Message>}
        {/* ADD TO BAG BUTTON */}
        <div className="addd__to__bag__button" onClick={addToCartFunction}>
          Add To Bag{" "}
          <span className="adding__product__final__price">
            ( Rs.{" "}
            {theTotalProductPrice(
              calculatedPrice,
              productDetails.price,
              quantitySelected
            )}
            )
          </span>
        </div>
        <div className="slogan__text__another">Our Poshak = Our Pride</div>
      </div>
    </>
  );

  function ProductTypesTableTabs({ name, index }) {
    return (
      <div
        className={`size__table__product__types inactive_btn__size__table ${
          index === value && "active_btn__size__table"
        }`}
        onClick={() => {
          setValue(index);
        }}
      >
        <div className="size__table__product__types__title">{name}</div>
      </div>
    );
  }
}

// product size attribute overall boxes
function ProductSizeAttribtutes({
  productTypesSizeAttributes,
  value,
  setValue,
}) {
  return (
    <div>
      {productTypesSizeAttributes.map((obj) => {
        return (
          <ProductSizeAttributesSingle
            key={obj.attribute_name}
            obj={obj}
            value={value}
            setValue={setValue}
          ></ProductSizeAttributesSingle>
        );
      })}
    </div>
  );
}

function ProductSizeAttributesSingle({ obj, value, setValue }) {
  // const [theTabValue, setTheTabValue] = useState(0);
  // const [container, setContainer] = useState(obj);
  return (
    <div>
      <div className="select__size__attributes__container">
        <div className="select__title__image">
          <div className="attribute_name"> SELECT {obj.attribute_name}:</div>
          {/* <div className="gif__url__video__conversion">
            <div>
              <img src={obj.attribute_gif_url} alt="gif url" height="70px" />
            </div>
            <div className="video_tutorial__text">
              <div>Watch Video</div>
              <YouTubeIcon
                className="tutorial__youtube__icon"
                fontSize="small"
              ></YouTubeIcon>
            </div>
          </div> */}
        </div>

        <IndividualSelectingAttributeContainer
          obj={obj}
          value={value}
          setValue={setValue}
        ></IndividualSelectingAttributeContainer>
      </div>

      <hr />
    </div>
  );
}

function IndividualSelectingAttributeContainer({ obj, value, setValue }) {
  console.log("state", value);

  const onClick = (
    item,
    index,
    product_type_id,
    attribute_value,
    attribute_price
  ) => {
    setValue({
      ...value,
      [item]: {
        index: index,
        product_type_id: product_type_id,
        attribute_name: item,
        attribute_value: attribute_value,
        attribute_price: attribute_price,
      },
    });
  };
  return (
    <div className="selecting_size_containers_div">
      {obj.attribute_value.map((objAv, index) => {
        return (
          <SelectingSizeAttributesContainer
            attribute_description={
              obj.attribute_description[index].attributeDescription
            }
            key={`${obj.attribute_name}${index}`}
            attribute_value={objAv.attributeValue}
            item={obj.attribute_name}
            selected={
              value[obj.attribute_name] &&
              index === parseInt(value[obj.attribute_name].index)
            }
            index={index}
            onClick={onClick}
            product_type_id={obj.product_type_id}
            unit={obj.product_type_unit_id}
            attribute_price={
              obj.price_per_m && obj.price_per_m * objAv.attributeValue
            }
          ></SelectingSizeAttributesContainer>
        );
      })}
    </div>
  );
}

// selecting size attributes container
function SelectingSizeAttributesContainer({
  attribute_value,
  attribute_description,
  selected,
  index,
  onClick,
  item,
  product_type_id,
  attribute_price,
  unit,
}) {
  console.log("=============UNIT=========");
  console.log(unit);
  console.log("====================================");
  return (
    <div
      className={`selecting_size_containers_div_tab ${
        selected && "activated_selected_containers"
      }`}
      onClick={() => {
        onClick(item, index, product_type_id, attribute_value, attribute_price);
      }}
    >
      <div className="attribute_value">
        {attribute_value} {unit === 3 ? "m" : null}
      </div>
      <div className="attribute_description">{attribute_description}</div>
    </div>
  );
}

// selecting quantity
function SelectingQuantityFunction({ quantitySelected, setQuantitySelected }) {
  const [value, setValue] = useState(0);
  const theData = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="attribute_name">SELECT QUANTITY:</div>
      <div className=" selecting_size_containers_div">
        {theData.map((obj, index, value) => {
          return (
            <SelectingQuantityContainer
              index={index}
              quantity={obj}
              quantitySelected={quantitySelected}
              setQuantitySelected={setQuantitySelected}
            ></SelectingQuantityContainer>
          );
        })}
      </div>
    </div>
  );

  function SelectingQuantityContainer({
    quantity,
    index,
    setQuantitySelected,
  }) {
    return (
      <div
        className={`selecting_size_containers_div_tab ${
          index === value && "activated_selected_containers"
        }`}
        onClick={() => {
          setValue(index);
          setQuantitySelected(quantity);
        }}
      >
        <div className="attribute_value">{quantity}</div>
      </div>
    );
  }
}

// FUNCTION FOR CALCULATING TOTAL PRODUCT PRICE
const theTotalProductPrice = (priceArray, price, quantitySelected) => {
  let calculatedPrice =
    (parseInt(price) + priceArray.reduce(getSum, 0)) * quantitySelected;
  function getSum(total, num) {
    return total + parseInt(num);
  }
  return calculatedPrice;
};
