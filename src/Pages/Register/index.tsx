import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { RegisterInput, RegisterState } from "../../Types";
import { userLogin } from "../../Redux/Actions/AuthActions";
import { useAppDispatch } from "../../Components/Hooks";

const RegisterInputs: RegisterInput[] = [
  {
    name: "userName",
    label: "Enter username",
  },
  {
    name: "password",
    label: "Enter password",
  },
  {
    name: "email",
    label: "Enter email",
  },
];

const Register = () => {
  const dispactch = useAppDispatch();
  const [user, setUser] = useState<RegisterState>({
    userName: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState<RegisterState>({
    userName: "",
    password: "",
    email: "",
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

  const handleSubmit = async () => {
    localStorage.setItem("accessToken", "test");
    dispactch(userLogin(user));
    console.log("dispactch(userLogin(user))", await dispactch(userLogin(user)));
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
          {RegisterInputs.map((it, i) => {
            return (
              <Grid item md={12} key={i}>
                <TextField
                  name={it.name}
                  value={user[it.name]}
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
        <Button
          fullWidth
          variant="contained"
          sx={{ marginBottom: "20px" }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
