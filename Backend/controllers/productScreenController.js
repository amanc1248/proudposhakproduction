const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.js");

//@desc get product Type Details
//@route GET api/product/getProductTypeDetails
//@access PRIVATE

const getProductScreenDetails = asyncHandler(async (req, res) => {
  console.log("THis is productId");
  console.log(req.params.productId);
  let productId = req.params.productId;
  let productDetailsSql = ` select    product.product_id,    product.name,   product.description,    product.price , product.product_shop_image,    group_concat(product_url) as product_images,  @uPID:=product.unique_product_id as unique_product_id,   seller.seller_id,  seller.name as seller_name from product_image 
     join product on product.product_id = product_image.product_id
    join seller_product on seller_product.product_id = product.product_id    
    join seller on seller.seller_id = seller_product.seller_id   
     where product.product_id ='${productId}';`;

  let getProductImages = ` select * from product_image where product_id='${productId}'order by position;`;
  let productTypeDetailsSql = ` select product_type.product_type_id, product_type.name,    
    product_type.description   from product_type  
    join unique_product_type_combined on unique_product_type_combined.product_type_id = product_type.product_type_id  
    where unique_product_type_combined.unique_product_id = @uPID;`;
  let productAttributesDetailsSql = `  select  product_type.product_type_id,  
    group_concat(DISTINCT size_attributes.size_attributes_id) as size_attributes_id,    
    group_concat(DISTINCT size_attributes.attribute_name) as attribute_name,   
    size_attributes.product_type_method_id,   
     size_attributes.product_type_type_id,      
     size_attributes.product_type_unit_id,    
     group_concat(DISTINCT size_attributes.attribute_gif_url) as attribute_gif_url,    
     group_concat(DISTINCT size_attributes.attribute_youtube_video) as attribute_youtube_video,    
     group_concat( attribute_value_size_attribute.attribute_value_description_id) as attribute_value_description_id,    
     group_concat( attribute_value_description.attribute_value) as attribute_value,     
     group_concat( attribute_value_description.attribute_value_description) as attribute_value_description,    
     size_attributes.if_price_per_m as price_per_m   from product_type    
     join unique_product_type_combined on unique_product_type_combined.product_type_id = product_type.product_type_id    
     join product_type_size_attributes on product_type_size_attributes.product_type_id =  product_type.product_type_id     
     join size_attributes on size_attributes.size_attributes_id = product_type_size_attributes.size_attributes_id  
     join attribute_value_size_attribute on attribute_value_size_attribute.size_attributes_id =size_attributes.size_attributes_id  
     join attribute_value_description on attribute_value_description.attribute_value_description_id = attribute_value_size_attribute.attribute_value_description_id   
     where unique_product_type_combined.unique_product_id=@uPID  group by size_attributes.attribute_name order by product_type.product_type_id ;`;
  let sql =
    productDetailsSql +
    getProductImages +
    productTypeDetailsSql +
    productAttributesDetailsSql;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

//@desc get product category details
//@route GET api/product/categoryProducts
//@access PUBLIC
const getProductCategoryProducts = asyncHandler(async (req, res) => {
  console.log("===================categoryId=================");
  console.log(req.params.categoryId);
  console.log("====================================");

  let categoryId = req.params.categoryId;
  let sql = `
  select * from product_sub_category
join category_sub_category on category_sub_category.sub_category_id = product_sub_category.id
join product_category on product_category.product_category_id = category_sub_category.category_id
where category_sub_category.category_id = '${categoryId}' 
order by product_sub_category.position asc;


select * from product
join product_product_sub_category on product_product_sub_category.product_id = product.product_id
join category_sub_category on category_sub_category.sub_category_id = product_product_sub_category.product_sub_category_id
where category_sub_category.category_id='${categoryId}' order by product.position asc;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      console.log("====the result================================");
      console.log(result);
      console.log("====================================");
      res.json(result);
    }
  });
});

//@desc get sub category products details
//@route GET api/product/subCategoryProducts
//@access PUBLIC
const getSubCategoryProducts = asyncHandler(async (req, res) => {
  console.log(req.params.subCategoryName);
  let subCategoryName = req.params.subCategoryName;
  let subCategoryId = req.params.subCategoryId;
  let sql = `
  select * from product
  join product_product_sub_category on product_product_sub_category.product_id =product.product_id
  where product_product_sub_category.product_sub_category_id ='${subCategoryId}' order by product.position asc;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

//@desc get product categories
//@route GET api/product/productCategories
//@access PUBLIC
const getProductCategories = asyncHandler(async (req, res) => {
  let sql = `
  SELECT * FROM proudposhak.product_category;
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

//@desc get product sub categories
//@route GET api/product/productSubCategories
//@access PUBLIC
const getProductSubCategories = asyncHandler(async (req, res) => {
  let sql = `
  SELECT * FROM proudposhak.product_sub_category order by position asc;  
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

module.exports = {
  getProductScreenDetails,
  getProductCategoryProducts,
  getSubCategoryProducts,
  getProductCategories,
  getProductSubCategories,
};
