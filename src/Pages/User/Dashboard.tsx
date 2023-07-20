import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Pagination,
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
import { ProductsData } from "../../Types";
import ListTable from "../../Components/Table";

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
  const [popup, setPopup] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [list, setList] = useState<ProductsData[]>([]);
  const [limit, setLimit] = useState<number>(1);

  const resetStatus = () => dispatch(reset());
  const getProducts = () => dispatch(getAllProducts());

  useEffect(() => {
    if (Products.length === 0) {
      // Get initial data
      getProducts();
    }
    if (reduxLoader !== loader) {
      // Set loader and initial table data
      setLoader(reduxLoader);
      fetchData(limit);
    }

    if (status && [ADD_PRODUCT_SUCCESS].includes(status)) {
      //update list after add or update
      getProducts();
      resetStatus();
    }

    if (status === PRODUCT_DELETE_SUCCESS) {
      //set delete message success popup
      setPopup(true);
      setLoader(false);
      resetStatus();
      getProducts();
    }
  }, [status, Products]);

  const { userName } = userDetails;

  const fetchData = (page: number) => {
    const filtered = Products.slice(page * 10 - 10, page * 10);
    setList(filtered);
    setLimit(page);
  };

  const pageSelect = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchData(value);
  };

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
      ) : (<ListTable data={list} headers={tableHead} onDelete={onDelete} />)}
      <Pagination
        count={Math.ceil(Products.length / 10)}
        sx={{
          ".MuiPagination-ul": { justifyContent: "flex-end" },
        }}
        onChange={pageSelect}
      />
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
