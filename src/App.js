import "./App.css";
import React, { useState, useEffect } from "react";
import DisplayTable from "./DisplayTable";
import {
  TextField,
  Container,
  Box,
  CssBaseline,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

function App() {
  const [value, setValue] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [allInput, setAllInput] = useState([]);
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
      setAllInput([]);
      window.localStorage.setItem("lessonplan", JSON.stringify(allInput));
      console.log("null is triggered");
    } else {
      setAllInput(JSON.parse(window.localStorage.getItem("lessonplan")));
      console.log("i am loaded");
    }
  }, []);

  useEffect(() => {
    setAllInput(JSON.parse(window.localStorage.getItem("lessonplan")));
  }, [handleSubmit]);

  const handleChange = (e) => {
    const label = e.target.name;
    const input = e.target.value;
    setInputError(false);
    setUserInput({ ...userInput, [label]: input });
    // console.log("this is handlechange subject: " + userInput.subject);
    // console.log("this is handlechange lesson: " + userInput.lessoncontent);
    // console.log("this is handlechange date: " + userInput.date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.subject && userInput.lessoncontent && value) {
      console.log("i am clicked");
      let store = [...allInput, userInput];
      console.log(store);
      // console.log(userInput);
      setAllInput(store);
      // console.log("this is all input ");
      // console.log(allInput);
      // console.log("this is user Input" + userInput);
      window.localStorage.setItem("lessonplan", JSON.stringify(store));
      setUserInput({
        subject: "",
        lessoncontent: "",
        date: "",
      });
      setValue(null);
    } else {
      setInputError(true);
    }
  };

  useEffect(() => {
    setUserInput({ ...userInput, date: value });
    // console.log("this is the date: " + userInput.date);
  }, [value]);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <DisplayTable data={allInput} />
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
