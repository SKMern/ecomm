import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import {
  deleteProduct,
  getAllProducts,
  reset,
  setReduxLoader,
} from "../../Redux/Actions/productActions";
import { useNavigate } from "react-router";
import {
  ADD_PRODUCT_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "../../Redux/ActionTypes";
import Loader from "../../Components/Loader";

const tableHead = ["ID", "Title", "Category", "Action"];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.Products.addMessage);
  const reduxLoader = useAppSelector((state) => state.Products.loader);
  const userDetails = useAppSelector((state) => state.Authentication);
  const Products = useAppSelector((state) =>
    state.Products.products.filter((it) => it.category === "bags")
  );
  const [popup, setPopup] = useState(false);
  const [loader, setLoader] = useState(true);

  const resetStatus = () => dispatch(reset());
  const getProducts = () => dispatch(getAllProducts());

  useEffect(() => {
    if (Products.length === 0) {
      getProducts();
    }
    if (reduxLoader !== loader ) {console.log('redux', reduxLoader)
      setLoader(reduxLoader);
    }

    if(status && [ADD_PRODUCT_SUCCESS].includes(status)){console.log('releooad')
      getProducts();
      resetStatus();
    }

    if (status === PRODUCT_DELETE_SUCCESS) {
      console.log("delelte");
      setPopup(true);
      setLoader(false);
      resetStatus();
      getProducts();
    }
  }, [status, Products]);
  const { userName } = userDetails;
console.log('Loader', loader)
  const onDelete = (id: string) => {
    setLoader(true);
    dispatch(setReduxLoader());
    dispatch(deleteProduct(id.toString()));
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "30px 0" }}>
        Hi! <span style={{ color: "brown" }}>{userName}</span>
      </Typography>
      {loader ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {tableHead.map((it, i) => {
                  return <TableCell sx={{fontWeight: 'bold'}} key={i}>{it}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((it, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/edit/${it.id}`)}
                      >
                        {it.id}
                      </span>
                    </TableCell>
                    <TableCell>{it.title}</TableCell>
                    <TableCell>{it.category}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => onDelete(it._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={popup}>
        <DialogTitle>Product Deleted success</DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setPopup(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
