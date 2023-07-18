import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import { getAllProducts } from "../../Redux/Actions/productActions";
import Loader from "../../Components/Loader";
import ImageCard from "../../Components/Cards";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.Products.products);
  const loader = useAppSelector((state) => state.Products.status);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  if (!loader) return <Loader />;
  return (
    <Container maxWidth="xl">
      <h1 style={{ textAlign: "center" }}>All products</h1>
      <Grid container spacing={4}>
        {products.map((it, i) => {
          if (it.category === "bags")
            return (
              <Grid item sm={6} md={4} lg={2.4} key={i}>
                <div onClick={() => navigate(`product/${it.id}`)}>
                  <ImageCard {...it} />
                </div>
              </Grid>
            );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
