class ProductImagesClass {
  constructor({ product_url }) {
    this.product_url = product_url;
  }
}

class ProductDetailsClass {
  constructor({
    id,
    name,
    description,
    price,
    image,
    seller_id,
    unique_product_id,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.seller_id = seller_id;
    this.unique_product_id = unique_product_id;
  }
}

class ProductTypeClass {
  constructor({ id, product_type_name }) {
    this.id = id;
    this.product_type_name = product_type_name;
  }
}

class ProductAttributesClass {
  constructor({
    product_type_id,
    attribute_id,
    attribute_name,
    product_type_method_id,
    product_type_type_id,
    product_type_unit_id,
    attribute_gif_url,
    attribute_youtube_video,
    attribute_value_description_id,
    attribute_value,
    attribute_description,
    price_per_m,
  }) {
    this.product_type_id = product_type_id;
    this.attribute_id = attribute_id;
    this.attribute_name = attribute_name;
    this.product_type_method_id = product_type_method_id;
    this.product_type_type_id = product_type_type_id;
    this.product_type_unit_id = product_type_unit_id;
    this.attribute_gif_url = attribute_gif_url;
    this.attribute_youtube_video = attribute_youtube_video;
    this.attribute_value_description_id = attribute_value_description_id;
    this.attribute_value = attribute_value;
    this.attribute_description = attribute_description;
    this.price_per_m = price_per_m;
  }
}

class ProductAttributeValue {
  constructor({ attributeValue, isSelected }) {
    this.attributeValue = attributeValue;
    this.isSelected = isSelected;
  }
}
class ProductAttributeDescription {
  constructor({ attributeDescription }) {
    this.attributeDescription = attributeDescription;
  }
}
export {
  ProductAttributesClass,
  ProductDetailsClass,
  ProductTypeClass,
  ProductImagesClass,
  ProductAttributeValue,
  ProductAttributeDescription,
};
