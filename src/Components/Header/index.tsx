import React, { useState } from "react";
import {
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { userLogout } from "../../Redux/Actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Hooks";
import { getLocalAccessToken } from "../../Api";
import MenuIcon from "@mui/icons-material/Menu";
import { CancelSharp } from "@mui/icons-material";

const leftAlign = (left: boolean) => {
  return {justifyContent: left ? "flex-start !important" : "center"}
}

const Header = () => {
  let history = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = getLocalAccessToken();
  const theme = useTheme();
  const isIpad = useMediaQuery(theme.breakpoints.down("md"));
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const routeTo = (route: string) => {
    history(route);
    controlDraw(false);
  };

  const logout = () => {
    dispatch(userLogout());
    history("/login");
    controlDraw(false);
  };

  

  const controlDraw = (show: boolean) => setShowMenu(show);
  const navMenus = (
    <>
      {isLoggedIn ? (
        <Paper elevation={0}
          sx={{
            display: "flex",
            flexDirection: isIpad ? "column" : "row",
            padding: isIpad ? "20px" : "0",
            justifyContent: "space-between",
            ". MuiButtonBase-root" : {
              justifyContent: isIpad ? 'flex-start' : "center",
              color: 'red'
            }
          }}
        >
          {isIpad && (
            <IconButton sx={leftAlign(isIpad)} onClick={() => controlDraw(false)}>
              {" "}
              <CancelSharp />
            </IconButton>
          )}
          <Button sx={leftAlign(isIpad)} onClick={() => routeTo(`/profile`)}>Dashboard</Button>
          <Button sx={leftAlign(isIpad)} onClick={() => routeTo("/add")}>Add Product</Button>
          <Button sx={leftAlign(isIpad)} onClick={logout}>Logout</Button>
        </Paper>
      ) : (
        <Button
          sx={{ margin: isIpad ? "20px 10px" : "0", ...leftAlign(isIpad) }}
          variant="text"
          onClick={() => routeTo("/login")}
        >
          Login / Register
        </Button>
      )}
    </>
  );

  const MenuButton = (
    <IconButton onClick={() => controlDraw(true)}>
      <MenuIcon />
    </IconButton>
  );

  return (
    <Container
      maxWidth='xl'
      sx={{
        height: 70,
        padding: "20px !important",
        boxShadow: "0 5px 6px -6px #777",
        background: "white",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item md={6}>
          <Button
            sx={{ color: "#000", textTransform: "none" }}
            onClick={() => routeTo("/")}
          >
            eComm
          </Button>
        </Grid>
        <Grid item md={6}>
          <Grid container justifyContent="flex-end">
            {isIpad ? MenuButton : navMenus}
          </Grid>
        </Grid>
      </Grid>
      <Drawer open={showMenu} anchor="right" onClose={() => controlDraw(false)}>
        {navMenus}
      </Drawer>
    </Container>
  );
};

export default Header;
