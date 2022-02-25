const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.js");

//@desc insert order details
//@route post api/orders/
//@access PRIVATE

const insertOrder = asyncHandler(async (req, res) => {
  //   const { email, firstName, lastName } = req.body;
  const { order_details, shipping_details, ordered_unique_products } = req.body;
  console.log("====================================");
  console.log(order_details);
  console.log(shipping_details);
  console.log(ordered_unique_products);
  console.log("====================================");

  // 👇👇1. for shipping
  const { name, phone, city, street } = shipping_details;
  let order_shippingSql =
    "select @shippingCount:= count(*)+1 from order_shipping;select @shippingId:=concat('ship', @shippingCount);INSERT INTO order_shipping values(@shippingId,?,?,?,?);";

  // 👇👇2. for order
  const { customer_id, totalPrice, payment_method } = order_details;

  const makingUniqueOrderId =
    "oUP" + ordered_unique_products.length + "sD" + phone;
  let order_sql =
    "select @orderIdCount:=count(*)+1 as orderId from theorder;select @theOrderId:= concat(@orderIdCount,?,@shippingId) as uniqueOrderId; INSERT INTO theorder values (@theOrderId,?,now(),?,?,'0','0','false',@shippingId); ";

  let sql1 = order_shippingSql + order_sql;
  db.query(
    sql1,
    [
      name,
      phone,
      city,
      street,
      makingUniqueOrderId,
      customer_id,
      totalPrice,
      payment_method,
    ],
    (err, result) => {
      if (err) throw err;
      if (result) {
        // res.json(result[4][0]["uniqueOrderId"]);
        const uniqueOrderId = result[4][0]["uniqueOrderId"];

        // second step inserting into ordered_unique_product
        let orderedUniqueProductSql = "";
        console.log("first step ordering");
        const theMainOrderId = result[4][0]["uniqueOrderId"];
        console.log("====================================");
        let attributeSql = "";
        {
          ordered_unique_products.map((obj) => {
            orderedUniqueProductSql =
              orderedUniqueProductSql +
              `select @orderedUniqueProductCount:= count(*)+1 from ordered_unique_product;select @orderedUniqueProductId:=concat('oUPI', @orderedUniqueProductCount);INSERT INTO ordered_unique_product values (@orderedUniqueProductId,'${uniqueOrderId}', '${obj.unique_product_id}', '${obj.seller_id}','${obj.quantity}','${obj.total_price}','${obj.image}','${obj.product_name}');`;
          });
        }
        let finalFinalSql =
          orderedUniqueProductSql +
          `select ordered_unique_product_id from ordered_unique_product where order_id = '${uniqueOrderId}';`;
        db.query(finalFinalSql, [], (err, result) => {
          if (err) throw err;
          if (result) {
            let orderedUniqueProducts = result[result.length - 1];

            let attributesSql = "";
            {
              ordered_unique_products.map((oUPObj, index) => {
                {
                  oUPObj.product_types.map((pTypesObj) => {
                    {
                      pTypesObj.attributes.map((attObj) => {
                        attributesSql =
                          attributesSql +
                          `select @orderedProductReqCount:= count(*)+1 from order_product_requirements;select @orderedProductReqId:=concat('oPRI', @orderedProductReqCount);INSERT INTO order_product_requirements values ( @orderedProductReqId,'${orderedUniqueProducts[index].ordered_unique_product_id}','${attObj.attribute_name}','${attObj.attribute_value}');`;
                      });
                    }
                  });
                }
              });
            }
            db.query(attributesSql, [], (err, result) => {
              if (err) throw err;
              if (result) {
                console.log("====================================finalsql");
                console.log({ result, theMainOrderId });
                console.log("====================================");
                res.json({ result, theMainOrderId });
              }
            });
          }
        });
      }
    }
  );
});

//@desc get logged in user orders
//@route GET /api/order/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  let customerId = req.params.customerId;

  let sql =
    "  select   theorder.order_id as orderId,  theorder.date as date,  theorder.paid_status as paidStatus,  theorder.delivered_status as deliveredStatus,  order_shipping.name,  theorder.total_price  from theorder join  customer on customer.customerId = theorder.customer_id join  order_shipping on order_shipping.shipping_id = theorder.shipping_id  where theorder.customer_id =?;";
  db.query(sql, [customerId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      console.log("the result here====================================");
      console.log(result);
      console.log("====================================");
      res.json(result);
    }
  });
});

//@desc get order by id
//@route GET /api/order/:orderId
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  console.log(req.params.orderId);
  let orderId = req.params.orderId;
  let sql = `   select * from theorder 
  join customer on customer.customerId  = theorder.customer_id
  join order_shipping on order_shipping.shipping_id = theorder.shipping_id
  where theorder.order_id  = '${orderId}';

  select 
  ordered_unique_product.ordered_unique_product_id, 
  ordered_unique_product.order_id,
  ordered_unique_product.unique_product_id,
  ordered_unique_product.quantity,
  ordered_unique_product.price,
  ordered_unique_product.image,
  ordered_unique_product.product_name,
  group_concat(order_product_requirements.order_product_requirements_id) as order_product_requirements_id,
  group_concat(order_product_requirements.size_attributes_name) as size_attributes_name,
  group_concat(order_product_requirements.size_attributes_value) as size_attributes_value
  from ordered_unique_product
  join order_product_requirements on order_product_requirements.ordered_unique_product_id = ordered_unique_product.ordered_unique_product_id 
  where ordered_unique_product.order_id ='${orderId}'
  group by ordered_unique_product.ordered_unique_product_id;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      console.log(result);
      res.json(result);
    }
  });
});

module.exports = {
  insertOrder,
  getMyOrders,
  getOrderById,
};
