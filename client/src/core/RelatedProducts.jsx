import React, { useEffect, useState } from "react";
import Card from "./Card";
import { relatedProduct } from "./coreApi";

function RelatedProducts(props) {
  const [related, SetRelated] = useState([]);

  useEffect(() => {
    relatedProduct(props.productId).then((data) => {
      SetRelated(data);
    });
  }, []);
  return (
    <>
      {related.length
        ? related.map((p, k) => (
            <div className="col-md-12 col-sm-6 mb-5" key={k}>
              <Card product={p} />
            </div>
          ))
        : ""}
    </>
  );
}

export default RelatedProducts;
