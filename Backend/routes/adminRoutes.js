const express = require("express");
const { getProductTypeDetails } = require("../controllers/adminControllers.js");
const router = express.Router();

router.route("/getProductTypeDetails").get(getProductTypeDetails);
module.exports = router;
