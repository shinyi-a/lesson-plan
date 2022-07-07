import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableBody,
} from "@mui/material";
const moment = require("moment");

export default function DisplayTable(props) {
  //   console.log("this is props");
  //   console.log(props.data);
  let lessonPlanData = props.data;

  const [sortDirection, setSortDirection] = useState("asc");
  const [dataToSort, setDataToSort] = useState("subject");

  const processSort = (e, property) => {
    const isAscending = dataToSort === property && sortDirection === "asc";
    setDataToSort(property);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  const handleSortRequest = (property) => (e) => {
    processSort(e, property);
  };

  const sortedRowInformation = (rowArr, comparator) => {
    const lessonPlanArr = rowArr.map((lessonplan, index) => [
      lessonplan,
      index,
    ]);
    // console.log("array with index")
    // console.log(lessonPlanArr);
    lessonPlanArr.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    // console.log("array after sort");
    // console.log(lessonPlanArr);
    return lessonPlanArr.map((lessonplan) => lessonplan[0]);
  };

  function descendingComparactor(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparactor(a, b, orderBy)
      : (a, b) => -descendingComparactor(a, b, orderBy);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="subject" onClick={handleSortRequest("subject")}>
              <TableSortLabel
                active={dataToSort === "subject"}
                direction={dataToSort === "subject" ? sortDirection : "asc"}
              >
                Subject
              </TableSortLabel>
            </TableCell>
            <TableCell key="date" onClick={handleSortRequest("date")}>
              <TableSortLabel
                active={dataToSort === "date"}
                direction={dataToSort === "date" ? sortDirection : "asc"}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRowInformation(
            lessonPlanData,
            getComparator(sortDirection, dataToSort)
          ).map((lesson, index) => (
            <TableRow key={index} hover={true}>
              <TableCell>{lesson.subject}</TableCell>
              <TableCell>{moment(lesson.date).format("DD MMM YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
