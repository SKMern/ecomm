import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { LoginState } from "../../Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userLogin } from "../../Redux/Actions/AuthActions";
import { useAppDispatch } from "../../Components/Hooks";

const Login = () => {
  const dispactch = useAppDispatch();
  const [user, setUser] = useState<LoginState>({
    userName: "",
    password: "",
    showpassword: false,
  });
  const [error, setError] = useState<LoginState>({
    userName: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("e.target", value, name);
    setUser({
      ...user,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  const showHide = () => {
    setUser({ ...user, showpassword: !user.showpassword });
  };

  const handleSubmit = () => {
    dispactch(userLogin(user));
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box
        component="div"
        sx={{
          p: 3,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: "5px",
          maxWidth: "450px",
          margin: "30px auto",
        }}
      >
        <Grid container>
          <Grid item md={12}>
            <TextField
              name="userName"
              value={user.userName}
              onChange={onChange}
              label="Enter Username"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: "20px",
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="password"
              type={user.showpassword ? "text" : "password"}
              value={user.password}
              onChange={onChange}
              label="Enter Password"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: "20px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={showHide}
                    >
                      {user.showpassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          sx={{ marginBottom: "20px" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Grid container justifyContent="center">
          Not a member&nbsp;
          <Link underline="hover" href="/register">
            Register
          </Link>
          &nbsp; here
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
