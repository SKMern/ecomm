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
import { AddProductState, RegisterInput } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../Components/Hooks";
import { productSchema, validate } from "../../Components/Helper";
import { useLocation, useNavigate } from "react-router";
import { addProduct, updateProduct } from "../../Redux/Actions/productActions";
import { ADD_PRODUCT_SUCCESS } from "../../Redux/ActionTypes";

const productInputs: RegisterInput[] = [
  {
    name: "title",
    label: "Enter Product Title",
  },
  {
    name: "image",
    label: "Enter image url",
  },
  {
    name: "price",
    label: "Enter product price",
  },
  {
    name: "description",
    label: "Enter product description",
  },
];

const restData = {
  category: "bags",
  rating: 4,
  netWeight: 500,
  grossWeight: 500,
  discPrice: 500,
};

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editId = location.pathname.split("/edit/")[1];
  const selectedProduct = useAppSelector((state) =>
    state.Products.products.find((it) => it.id === +editId)
  );
  const [product, setProduct] = useState<AddProductState>({
    ...productSchema,
    loader: false,
    popup: false,
  });
  const [error, setError] = useState<AddProductState>({
    ...productSchema,
    price: "",
  });
  const status = useAppSelector((state) => state.Products.addMessage);
  const allProduct = useAppSelector((state) => state.Products.products);
  const id =
    allProduct && allProduct.length > 0
      ? allProduct[allProduct.length - 1].id + 2
      : 0;

  useEffect(() => {
    if (!editId && product.id) {
      console.log("adda");
      setProduct({ ...productSchema, popup: false });
    }
    if (status) {
      setError({ ...error, loginStatus: status });
      setProduct({ ...product, loader: false });
    }
    if (status === ADD_PRODUCT_SUCCESS) {
      console.log("first");
      setProduct({ ...product, popup: true, loader: false });
    }
    if (editId && !product.id) {
      setProduct({ ...product, ...selectedProduct });
    }
    if (editId && !selectedProduct) {
      navigate("/profile");
    }
  }, [status, editId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
      loader: false,
    });
  };

  const errorValidation = () => {
    error.title = !product.title ? "Title cannot be empty" : "";
    error.image = !product.image ? "Image url cannot be empty" : "";
    error.description = !product.description
      ? "Description cannot be empty"
      : "";
    error.price = !product.price || +product.price <= 0 ? "Set the price" : "";
    
    setError({...error});
  };

  const handleSubmit = async () => {
    const { title, image, price, description } = product;
    errorValidation();
    const data = { title, image, price, description },
      errorData = {
        title: error.title,
        image: error.image,
        price: error.price,
        description: error.description,
      };
    if (validate(data, errorData)) {
      setProduct({ ...product, loader: true });
      if (editId) {
        dispatch(
          updateProduct({
            _id: selectedProduct._id,
            id: editId,
            ...data,
            ...restData,
          })
        );
      } else dispatch(addProduct({ id, ...data, ...restData }));
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
          {productInputs.map((it, i) => {
            return (
              <Grid item sx={{ width: "100%" }} key={i}>
                <TextField
                  inputProps={{ "data-testid": it.name }}
                  name={it.name}
                  value={product[it.name]}
                  error={error[it.name] ? true : false}
                  helperText={error[it.name]}
                  type={it.name === "price" ? "number" : "text"}
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
          disabled={product.loader}
        >
          {editId ? "Update" : "Submit"}
        </Button>
      </Box>
      <Dialog open={product.popup ? product.popup : false}>
        <DialogTitle>
          Product {editId ? "Update" : "Add"} success, Click ok to Dashboard
          page
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddProduct;
