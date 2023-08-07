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
import { loginReset, userRegister } from "../../Redux/Actions/AuthActions";
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
  {
    name: "confirmPassword",
    label: "Confirm Password",
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterState>({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    loader: false,
    popup: false,
  });
  const [error, setError] = useState<RegisterState>({
    userName: "",
    password: "",
    confirmPassword: "",
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
    return () => {
      dispatch(loginReset());
    };
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

  //valid email returns true
  const isValidEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  //valid password return true
  const isValidPassword = (email: string) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
    console.log("regex.test(pwd)", regex.test(email));
    return regex.test(email);
  };

  const errorValidation = () => {
    let errors: any = {};
    if (!user.name) {
      errors.name = "Name cannot be empty";
    } else if (user.name.length < 3) {
      errors.name = "Enter min 3 char";
    } else {
      errors.name = "";
    }
    
    if (!user.userName) {
      errors.userName = "Username cannot be empty";
    } else if (user.userName.length < 3) {
      errors.userName = "Enter min 3 char";
    } else {
      errors.userName = "";
    }
    
    if (!user.email) {
      errors.email = "Email cannot be empty";
    } else if (!isValidEmail(user.email)) {
      errors.email = "Enter valid email";
    } else {
      errors.email = "";
    }
    
    if (!user.password) {
      errors.password = "Password cannot be empty";
    } else if (!isValidPassword(user.password)) {
      errors.password = "Password must contain min 8 char include upper lower digits spl chars";
    } else {
      errors.password = "";
    }
    
    if (!user.confirmPassword) {
      errors.confirmPassword = "Enter confirm password";
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Password doesn't match";
    } else {
      errors.confirmPassword = "";
    }
    
    errors.loginStatus = "";
    setError({ ...error, ...errors });
  };

  const handleSubmit = async () => {
    const { email, name, password, userName, confirmPassword } = user;
    setUser({ ...user, loader: true });
    errorValidation();
    const data = { email, name, password, userName, confirmPassword },
      errorData = {
        email: error.email,
        name: error.name,
        password: error.password,
        userName: error.userName,
        confirmPassword: error.confirmPassword,
      };
    if (validate(data, errorData)) {
      delete data["confirmPassword"];
      await dispatch(userRegister({ ...data, ...restData }));
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
              <Grid item sx={{ width: "100%" }} md={12} key={i}>
                <TextField
                  inputProps={{ "data-testid": it.name }}
                  name={it.name}
                  type={it.name === "password" ? "password" : "text"}
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
