import { color } from "@mui/system";
import React, { useState } from "react";

function ProductContainer({ id, name, image, price }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="individual__product__container__outer col-lg-3 col-md-3 col-6">
      <a
        href={`/products/${name}/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="individual__product__container">
          {loaded ? null : <div className="unloaded_image_div"></div>}

          <img
            className="individual__product__image"
            src={image}
            alt=""
            onLoad={() => setLoaded(true)}
          />
          <div className="individual__product__name">{name}</div>
          <div className="individual__product__price">Rs. {price}</div>
        </div>
      </a>
    </div>
  );
}

export default ProductContainer;
