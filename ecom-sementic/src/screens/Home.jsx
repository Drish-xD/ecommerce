import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { listProducts } from "../store/actions";

const Home = ({ listProducts }) => {
  const products = useSelector(({ Products }) => Products.products);
  console.log(products);

  useEffect(() => {
    listProducts();
  }, [listProducts]);

  return <div>Home</div>;
};

export default connect(null, { listProducts })(Home);
