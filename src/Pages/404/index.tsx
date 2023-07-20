import { Container } from "@mui/material";
import React from "react";

const NotFoundPage = () => {
  return (
    <Container maxWidth="md">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000"
        width="100%"
        height="500px"
        alt="404"
        style={{
          marginTop: '40px',
          borderRadius: '10px'
        }}
      />
    </Container>
  );
};

export default NotFoundPage;
