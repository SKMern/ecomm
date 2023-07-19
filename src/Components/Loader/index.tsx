import React from "react";
import { Container, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "65vh",
        width: "100vw",
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Container>
  );
};

export default Loader;
