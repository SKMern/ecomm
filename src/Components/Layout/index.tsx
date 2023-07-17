import React from "react";
import Header from "../Header";
import { Container } from "@mui/material";

const Layout = ({ children }: any) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        background: "#ebebeb45",
        padding: "0 !important",
      }}
    >
      <Header />
      <main style={{ paddingBottom: "50px" }}>{children}</main>
    </Container>
  );
};

export default Layout;
