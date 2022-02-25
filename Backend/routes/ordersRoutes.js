const express = require("express");

const {
  insertOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/ordersControllers.js");

const router = express.Router();

router.post("/", insertOrder);
router.route("/myorders/:customerId").get(getMyOrders);
router.route("/:orderId").get(getOrderById);

module.exports = router;
