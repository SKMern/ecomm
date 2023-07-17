import React from "react";
import { Button, Container, Grid, Link, Typography } from "@mui/material";
import { ReduxState } from "../../Types";
import { userLogout } from "../../Redux/Actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks";

const Header = () => {
  let history = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state: ReduxState) => state.Authentication.isLoggedIn
  );
  const userId = useAppSelector(
    (state: ReduxState) => state.Authentication._id
  );

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
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item md={6}>
          <p style={{ cursor: "pointer" }} onClick={() => routeTo("/")}>
            eComm
          </p>
        </Grid>
        <Grid item md={6}>
          <Grid container justifyContent="flex-end">
            {isLoggedIn ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => routeTo(`/profile/${userId}`)}>
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
