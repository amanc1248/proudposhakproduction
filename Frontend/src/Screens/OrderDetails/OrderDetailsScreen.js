import React, { useEffect } from "react";
import HeaderSpacer from "../../components/HeaderSpacer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import "../../Styles/order details/OrderDetails.css";
import { ORDER_DELIVER_RESET } from "../../constants/ordersConstants";
function OrderDetailsScreen() {
  let { orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { theOrder, loading, error } = orderDetails;
  console.log("The orders👇👇");
  console.log(theOrder);

  const theUniqueProductsOrdered = theOrder && theOrder[1];
  console.log("======theUniqueProductsOrdered===========");
  console.log(theUniqueProductsOrdered);
  console.log("====================================");

  // the ordered products in array
  const orderedProductsInArray = [];
  const convertingProducts = () => {
    theUniqueProductsOrdered &&
      theUniqueProductsOrdered.map((obj, index) => {
        const sizeAttributesNameInArray = obj.size_attributes_name.split(",");
        const sizeAttributesValueInArray = obj.size_attributes_value.split(",");
        let sizeAttributesName = [];
        let sizeAttributesValue = [];
        sizeAttributesNameInArray.map((sANObj, index) => {
          sizeAttributesName.push({ attributeName: sANObj });
          sizeAttributesValue.push({
            attributeValue: sizeAttributesValueInArray[index],
          });
        });

        theUniqueProductsOrdered[index].sizeAttributesName = sizeAttributesName;
        theUniqueProductsOrdered[index].sizeAttributesValue =
          sizeAttributesValue;
      });
  };
  convertingProducts();
  console.log("======theUniqueProducCONVERTED===========");
  console.log(theUniqueProductsOrdered);
  console.log("====================================");
  //   const pIInAllString =
  //   allProductDetails && allProductDetails[0].product_images;
  // const pIInAllArray = pIInAllString && pIInAllString.split(",");
  // let productImages = [];
  // const productImagesAddingFnc = () => {
  //   pIInAllArray &&
  //     pIInAllArray.map((obj) => {
  //       return productImages.push(new ProductImagesClass({ product_url: obj }));
  //     });
  // };
  // productImagesAddingFnc();

  useEffect(() => {
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <>
      <HeaderSpacer></HeaderSpacer>
      <div className="unique__product__page__container">
        <div className="unique__product__container__title">Order Details</div>
      </div>

      <div className="row no-gutters p-0 m-0">
        <div className="col-lg-4 col-sm-12 order__summary__container__outer">
          <div className="order__summary__container__inner">
            <div>
              {" "}
              <span className="order__summary__title">Order Id:</span>{" "}
              {theOrder && theOrder[0][0]["order_id"]}
            </div>
            <div>
              <span className="order__summary__title">Customer:</span>{" "}
              {theOrder && theOrder[0][0]["name"]}
            </div>
            <div>
              <span className="order__summary__title"> Payment: </span>
              {theOrder && theOrder[0][0]["paid_status"] === "0"
                ? "Not Paid"
                : "Paid"}
            </div>
            <div>
              <span className="order__summary__title">
                {" "}
                Delivery Location:{" "}
              </span>{" "}
              {theOrder && theOrder[0][0]["street"]}
            </div>
            <div>
              <span className="order__summary__title">Total Price:Rs. </span>{" "}
              {theOrder && theOrder[0][0]["total_price"]}
            </div>
          </div>
        </div>
      </div>
      <div className="row no-gutters p-0 m-0 order__details__container">
        {theUniqueProductsOrdered &&
          theUniqueProductsOrdered.map((obj) => {
            return (
              <div className="col-lg-4 col-sm-6 unique__order__summary__container__outer">
                <div className="unique__order__summary__container">
                  <div className="order__unique__product__container">
                    <img
                      src={obj.image}
                      alt="orderedUniqueProducts"
                      height="100px"
                    />{" "}
                    <div>
                      <div>{obj.product_name}</div>
                      <div>Rs. {obj.price}</div>
                      <div>Quantity: {obj.quantity}</div>
                    </div>
                  </div>

                  {obj.sizeAttributesName.map((sAN, index) => {
                    return (
                      <div>
                        <span className="attribute_name_order_details">
                          {sAN.attributeName}:
                        </span>
                        <span>
                          {obj.sizeAttributesValue[index].attributeValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default OrderDetailsScreen;
