const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.js");

//@desc get product Type Details
//@route GET api/admin/getProductTypeDetails
//@access PRIVATE

const getProductTypeDetails = asyncHandler(async (req, res) => {
  let sql =
    "select * from product_type where product_type_id=1; select * from size_attributes  join product_type_size_attributes on size_attributes.size_attributes_id = product_type_size_attributes.size_attributes_id where product_type_size_attributes.product_type_id=1;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

module.exports = {
  getProductTypeDetails,
};
