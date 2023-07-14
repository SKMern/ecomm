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
import React, { useEffect, useState } from "react";
import { LoginState } from "../../Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userLogin } from "../../Redux/Actions/AuthActions";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import { useNavigate } from "react-router";
import { validate } from "../../Components/Helper";

export const errorDesign = { color: "red", fontSize: "12px" };

const Login = () => {
  const dispactch = useAppDispatch();
  const [user, setUser] = useState<LoginState>({
    userName: "",
    password: "",
    showpassword: false,
    loader: false,
  });
  const [error, setError] = useState<LoginState>({
    userName: "",
    password: "",
    loginStatus: "",
  });

  const loginMessage = useAppSelector((state) => state.Authentication.message);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginMessage) {
      setError({ ...error, loginStatus: loginMessage });
      setUser({ ...user, loader: false });
    }
  }, [loginMessage]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
      loginStatus: "",
    });
  };

  const showHide = () => {
    setUser({ ...user, showpassword: !user.showpassword });
  };

  const errorValidate = () => {
    error.userName = !user.userName ? "Username cannot be empty" : "";
    error.password = !user.password ? "password cannot be empty" : "";
    error.loginStatus = "";
    setError(error);
  };

  const handleSubmit = async () => {
    const { userName, password } = user;
    setUser({ ...user, loader: true });
    errorValidate();
    const data = { userName, password },
      errorData = { userError: error.userName, passwordError: error.password };
    if (validate(data, errorData)) {
      const { userName, password } = user;
      const id = await dispactch(userLogin({ userName, password }));
      console.log("id", id);
      if (id) navigate(`/profile/${id}`);
    }
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
          <Grid
            item
            md={12}
            sx={{
              marginBottom: "20px",
            }}
          >
            <TextField
              name="userName"
              value={user.userName}
              error={error.userName ? true : false}
              helperText={error.userName}
              onChange={onChange}
              label="Enter Username"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              marginBottom: "20px",
            }}
          >
            <TextField
              name="password"
              type={user.showpassword ? "text" : "password"}
              value={user.password}
              error={error.password ? true : false}
              helperText={error.password}
              onChange={onChange}
              label="Enter Password"
              variant="outlined"
              fullWidth
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
        {error.loginStatus && (
          <span style={errorDesign}>{error.loginStatus}</span>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ marginBottom: "20px" }}
          onClick={handleSubmit}
          disabled={user.loader}
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
