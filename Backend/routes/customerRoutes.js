const express = require("express");
const {
  postUserLoginDetails,
} = require("../controllers/customerControllers.js");
const router = express.Router();

router.route("/signin").post(postUserLoginDetails);
module.exports = router;
