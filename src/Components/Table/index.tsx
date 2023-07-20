import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { ProductsData, TableProps } from "../../Types";
import { useNavigate } from "react-router";

const ListTable = ({ headers, data, onDelete }: TableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
      <Table size="medium" aria-label="a dense table">
        <TableHead sx={{ background: "#c3b9b94a" }}>
          <TableRow>
            {headers.map((it: string, i: number) => {
              return (
                <TableCell sx={{ fontWeight: "bold" }} key={i}>
                  {it}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((it: ProductsData, i: number) => {
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
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onDelete(it._id)}
                  >
                    Delete
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
