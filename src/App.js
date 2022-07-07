import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import {
  Table,
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

function App() {
  const [value, setValue] = useState(null);
  const [inputError, setInputError] = useState(false);
  // const [allInput, setAllInput] = useState([]);
  let allInput = [];
  const [userInput, setUserInput] = useState({
    subject: "",
    lessoncontent: "",
    date: "",
  });

  function RedBar() {
    return (
      <Box
        sx={{
          height: 20,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 0, 0, 0.1)"
              : "rgb(255 132 132 / 25%)",
        }}
      >
        Please enter all fields
      </Box>
    );
  }

  useEffect(() => {
    if (window.localStorage.getItem("lessonplan") === null) {
      console.log("null is triggered");
    } else {
      // setAllInput([]);
      // setAllInput(JSON.parse(window.localStorage.getItem("lessonplan")));
      allInput = JSON.parse(window.localStorage.getItem("lessonplan"));
      console.log("i am loaded");
      console.log(allInput);
      console.log(JSON.parse(window.localStorage.getItem("lessonplan")));
    }
  }, [[], handleChange]);

  const handleChange = (e) => {
    const label = e.target.name;
    const input = e.target.value;
    setInputError(false);
    setUserInput({ ...userInput, [label]: input });
    console.log("this is handlechange subject: " + userInput.subject);
    console.log("this is handlechange lesson: " + userInput.lessoncontent);
    console.log("this is handlechange date: " + userInput.date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.subject && userInput.lessoncontent && value) {
      console.log("i am clicked");
      // setAllInput((prevInput) => [...prevInput, userInput]);
      console.log(userInput);
      // setAllInput([...allInput, userInput]);
      allInput.push(userInput);
      // console.log("this is all Input: " + allInput[0]);
      console.log(allInput);
      console.log("this is user Input" + userInput);
      window.localStorage.setItem("lessonplan", JSON.stringify(allInput));
      setUserInput({
        subject: "",
        lessoncontent: "",
        date: "",
      });
      setValue(null);
      // setAllInput([]);
      allInput = [];
    } else {
      setInputError(true);
    }
  };

  useEffect(() => {
    setUserInput({ ...userInput, date: value });
    console.log("this is the date: " + userInput.date);
  }, [value]);

  return (
    <div className="App">
      {/* <header className="App-header">hello world</header> */}
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{ bgcolor: "#cfe8fc", height: "100vh" }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Subject Name"
            variant="outlined"
            name="subject"
            value={userInput.subject}
            onChange={handleChange}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Draft" />
          </FormGroup>
          <TextField
            id="outlined-textarea"
            label="Lesson Content"
            multiline
            rows={10}
            // fullWidth
            sx={{ width: "80%" }}
            variant="outlined"
            name="lessoncontent"
            value={userInput.lessoncontent}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Date" name="date" />
              )}
              inputFormat="dd-MM-yyyy"
            />
          </LocalizationProvider>
          <Button onClick={handleSubmit}>Save</Button>
          {inputError ? <RedBar /> : ""}
        </Box>
      </Container>
    </div>
  );
}

export default App;
