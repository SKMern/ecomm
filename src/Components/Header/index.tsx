import React from "react";
import { Button, Container, Grid, Link } from "@mui/material";
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
        <Grid item md={6} sx={{ margin: "auto" }}>
          <Link href="/" underline="none">
            eComm{" "}
          </Link>
        </Grid>
        <Grid item md={6}>
          <Grid container justifyContent="flex-end">
            {isLoggedIn ? (
              <Button onClick={logout}>Logout</Button>
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
