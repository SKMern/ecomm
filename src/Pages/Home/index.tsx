import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import { getAllProducts } from "../../Redux/Actions/productActions";
import Loader from "../../Components/Loader";
import ImageCard from "../../Components/Cards";
import { useNavigate } from "react-router";
import { ProductsData } from "../../Types";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.Products.products);
  const loader = useAppSelector((state) => state.Products.loader);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const [list, setList] = useState<ProductsData[]>([]);

  useEffect(() => {
    dispatch(getAllProducts());
    window.addEventListener("scroll", handleScroll);
    return () =>{
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  useEffect(() => {
    if (!loader) {
      fetchData();
    }
  }, [loader]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const fetchData = () => {
    const filtered: ProductsData[] = products.filter(it => it.category === 'bags').slice(0, limit * 10);
    setLimit(limit + 1);
    setList(filtered);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  const fetchMoreData = () => {
    fetchData();
    setIsFetching(false);
  };

  if (loader) return <Loader />;
  return (
    <Container maxWidth="xl">
      <h1 style={{ textAlign: "center" }}>All products</h1>
      <Grid container spacing={4}>
        {list.map((it, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
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
