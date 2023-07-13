import React from "react";
import { useLocation } from "react-router";
import { useAppSelector } from "../../Components/Hooks";

const Viewproduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/product/")[1];
  const allProducts = useAppSelector((state) => state.Products.products);

  return <div>Viewproduct</div>;
};

export default Viewproduct;
