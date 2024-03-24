import React from "react";
import cs from "classnames";

import "./Product.scss";

interface ProductProps {
    naziv?: string;
    dobavljac?: string;
    status?: string;
    id?: string;
  }

const Product = (props: ProductProps) => {
  const { naziv, dobavljac, status, id } = props;

  return (
    <div className="Product">
        <div className="Product__content">
        <h2 className="Product__title">{naziv}</h2>
        <p className="Product__subtitle">{dobavljac} </p>
        <p className={cs("Product__status", 
           status?.toLowerCase() === "kreirano" &&`Product__status--created`, 
           status?.toLowerCase() === "naručeno" && `Product__status--ordered`,
           status?.toLowerCase() === "isporučeno" && `Product__status--delivered`
            )}>{status}</p>
        </div>
     
    </div>
  );
};

export default Product;