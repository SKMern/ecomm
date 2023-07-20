import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Pagination,
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
import {
  ADD_PRODUCT_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "../../Redux/ActionTypes";
import Loader from "../../Components/Loader";
import { ProductsData } from "../../Types";
import ListTable from "../../Components/Table";

const tableHead = ["ID", "Title", "Category", "Action"];

const Dashboard = () => {
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
  const [deleteId, setDeleteId] = useState<string>("");

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
      setLoader(false);
      setDeleteId(PRODUCT_DELETE_SUCCESS);
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

  const deletePopup = (id: string) => {
    setPopup(true);
    setDeleteId(id);
  };

  const deleteConfirm = () => {
    dispatch(setReduxLoader());
    dispatch(deleteProduct(deleteId));
  };

  const closePopup = () => {
    setPopup(false);
    setTimeout(() => setDeleteId(""), 500);
  };

  const deleteSuccess = (
    <>
      <DialogTitle align="center">Product Deleted success</DialogTitle>
      <DialogActions sx={{ justifyContent: "center", marginBottom: "20px" }}>
        <Button variant="outlined" onClick={closePopup}>
          Ok
        </Button>
      </DialogActions>
    </>
  );

  const deleteContent = (
    <>
      <DialogTitle align="center">Are you sure to Delete ?</DialogTitle>
      <DialogActions sx={{ justifyContent: "center", marginBottom: "20px" }}>
        <Button
          disabled={loader}
          sx={{ textTransform: "none" }}
          variant="text"
          onClick={deleteConfirm}
        >
          Confirm
        </Button>
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          color="error"
          onClick={closePopup}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "30px 0" }}>
        Hi! <span style={{ color: "brown" }}>{userName}</span>
      </Typography>
      {loader ? (
        <Loader />
      ) : (
        <ListTable data={list} headers={tableHead} onDelete={deletePopup} />
      )}
      <Pagination
        count={Math.ceil(Products.length / 10)}
        sx={{
          ".MuiPagination-ul": { justifyContent: "flex-end" },
        }}
        onChange={pageSelect}
      />
      <Dialog open={popup} sx={{ ".MuiPaper-root": { width: "450px" } }}>
        {deleteId === PRODUCT_DELETE_SUCCESS ? deleteSuccess : deleteContent}
      </Dialog>
    </Container>
  );
};

export default Dashboard;
