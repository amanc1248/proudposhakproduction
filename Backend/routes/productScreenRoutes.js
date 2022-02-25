const express = require("express");
const {
  getProductScreenDetails,
  getSubCategoryProducts,
  getProductCategoryProducts,
  getProductCategories,
  getProductSubCategories,
} = require("../controllers/productScreenController.js");
const router = express.Router();

router
  .route("/getProductScreenDetails/:productId")
  .get(getProductScreenDetails);
router.route("/categoryProducts/:categoryId").get(getProductCategoryProducts);
router
  .route("/subCategoryProducts/:subCategoryName/:subCategoryId")
  .get(getSubCategoryProducts);
router.route("/productCategories").get(getProductCategories);
router.route("/productSubCategories").get(getProductSubCategories);

module.exports = router;
