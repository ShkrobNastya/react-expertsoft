import { useState, useEffect } from "react";
import ProductTile from "../../components/ProductTile/ProductTile";
import classes from "./ProductList.module.scss";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8000/products");

      setProducts(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.wrapper}>
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
