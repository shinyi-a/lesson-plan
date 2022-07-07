import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Container,
  Box,
  CssBaseline,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DisplayTable(props) {
  //   console.log("this is props" + props);
  //   console.log(props.data);
  //   let { data } = props;
  let userdata = props.data;
  console.log("user data");
  console.log(userdata);
  const [activeSort, setActiveSort] = useState("subject");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleSort = (e, property) => {
    const isAscending = activeSort === property && orderDirection === "asc";
    setActiveSort(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handleSortHandler = (property) => (e) => {
    handleSort(e, property);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="subject">
              <TableSortLabel
                active={activeSort === "subject"}
                direction={activeSort === "subject" ? orderDirection : "asc"}
                onClick={handleSortHandler("subject")}
              >
                Subject
              </TableSortLabel>
            </TableCell>
            <TableCell key="date">
              <TableSortLabel
                active={activeSort === "date"}
                direction={activeSort === "date" ? orderDirection : "asc"}
                onClick={handleSortHandler("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
