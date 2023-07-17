import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RegisterInput, RegisterState } from "../../Types";
import { userRegister } from "../../Redux/Actions/AuthActions";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import { validate } from "../../Components/Helper";
import { errorDesign } from "../Login";
import { USER_REGISTRATION_SUCCESS } from "../../Redux/ActionTypes";
import { useNavigate } from "react-router";

const RegisterInputs: RegisterInput[] = [
  {
    name: "name",
    label: "Enter your Name",
  },
  {
    name: "email",
    label: "Enter your Email-id",
  },
  {
    name: "userName",
    label: "Enter your User Name",
  },
  {
    name: "password",
    label: "Enter Password",
  },
  // {
  //   name: "Address",
  //   label: "Enter your address",
  // },
  // {
  //   name: "State",
  //   label: "Enter your state",
  // },
  // {
  //   name: "Country",
  //   label: "Enter your country",
  // },
  // {
  //   name: "Authorization question",
  //   label: "Enter your question",
  // },
  // {
  //   name: "Answer",
  //   label: "Enter your answer",
  // },
  // {
  //   name: "Pincode",
  //   label: "Enter your pincode",
  // },
];

const restData = {
  address: "test",
  pincode: 123123,
  state: "Tamil Nadu",
  country: "India",
  secQuestion: "qn",
  secAnswer: "as",
};
const Register = () => {
  const dispactch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterState>({
    userName: "",
    password: "",
    email: "",
    name: "",
    loader: false,
    popup: false,
  });
  const [error, setError] = useState<RegisterState>({
    userName: "",
    password: "",
    email: "",
    name: "",
    loginStatus: "",
  });
  const loginMessage = useAppSelector((state) => state.Authentication.message);

  useEffect(() => {
    if (loginMessage) {
      setError({ ...error, loginStatus: loginMessage });
      setUser({ ...user, loader: false });
    }
    if (loginMessage === USER_REGISTRATION_SUCCESS) {
      setUser({ ...user, popup: true });
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

  const errorValidation = () => {
    error.name = !user.name ? "Name cannot be empty" : "";
    error.userName = !user.userName ? "Username cannot be empty" : "";
    error.email = !user.email ? "Email cannot be empty" : "";
    error.password = !user.password ? "Password cannot be empty" : "";
    error.loginStatus = "";
    setError(error);
  };

  const handleSubmit = async () => {
    const { email, name, password, userName } = user;
    setUser({ ...user, loader: true });
    errorValidation();
    const data = { email, name, password, userName },
      errorData = {
        email: error.email,
        name: error.name,
        password: error.password,
        userName: error.userName,
      };
    if (validate(data, errorData)) {
      const status = await dispactch(userRegister({ ...data, ...restData }));
      console.log("status", status);
    }
  };

  return (
    <Container>
      <Box
        component="div"
        sx={{
          p: 3,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: "5px",
          maxWidth: "450px",
          margin: "30px auto",
          background: "white",
        }}
      >
        <Grid container>
          {RegisterInputs.map((it, i) => {
            return (
              <Grid item md={12} key={i}>
                <TextField
                  name={it.name}
                  value={user[it.name]}
                  error={error[it.name] ? true : false}
                  helperText={error[it.name]}
                  onChange={onChange}
                  label={it.label}
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginBottom: "20px",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        {error.loginStatus && (
          <span style={errorDesign}>{error.loginStatus}</span>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ marginBottom: "20px" }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Box>
      <Dialog open={user.popup ? user.popup : false}>
        <DialogTitle>Resgistration success, Click ok to Login page</DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => navigate("/login")}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Register;
