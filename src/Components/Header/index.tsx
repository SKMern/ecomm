import React, { useEffect } from "react";
import { Button, Container, Grid } from "@mui/material";
import { userLogout } from "../../Redux/Actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Hooks";
import { getLocalAccessToken } from "../../Api";
import { getAllProducts } from "../../Redux/Actions/productActions";

const Header = () => {
  let history = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = getLocalAccessToken();

  const routeTo = (route: string) => {
    history(route);
  };
  const logout = () => {
    dispatch(userLogout());
    history("/login");
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 70,
        padding: "20px !important",
        boxShadow: "0 5px 6px -6px #777",
        background: "white",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item md={6}>
          <Button sx={{color: '#000', textTransform: 'none'}} onClick={() => routeTo("/")}>
            eComm
          </Button>
        </Grid>
        <Grid item md={6}>
          <Grid container justifyContent="flex-end">
            {isLoggedIn ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => routeTo(`/profile`)}>
                  Dashboard
                </Button>
                <Button onClick={() => routeTo("/add")}>Add Product</Button>
                <Button onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button variant="text" onClick={() => routeTo("/login")}>
                Login / Register
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
