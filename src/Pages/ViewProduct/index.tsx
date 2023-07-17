import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAppSelector } from "../../Components/Hooks";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ProductsData } from "../../Types";
import Loader from "../../Components/Loader";
import { productSchema } from "../../Components/Helper";

const Viewproduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/product/")[1];
  const currentProduct: ProductsData = useAppSelector((state) =>
    state.Products.products.find((i) => i.id === +id)
  );
  const [loader, setLoader] = useState<boolean>(false);
  const [product] = useState<ProductsData>(
    currentProduct ? currentProduct : productSchema
  );

  useEffect(() => {
    if (currentProduct) {
      setLoader(false);
    }
  }, [currentProduct]);

  if (loader) return <Loader />;
  const { image, title, description, price, rating, category } = product;
  return (
    <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
      <Grid container gap={4}>
        <Grid item md={7} sm={12}>
          <img
            src={image}
            alt={title}
            width="100%"
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item md={4} sm={12}>
          <Box>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2" color="gray">
              {description}
            </Typography>
            <Typography variant="subtitle1">Rs.{price}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Viewproduct;
