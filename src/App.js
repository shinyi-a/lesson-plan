import "./App.css";
import React, { useState, useEffect } from "react";
import DisplayTable from "./DisplayTable";
import {
  TextField,
  Box,
  CssBaseline,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000080",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#FEFAF8",
    },
  },
});

function App() {
  const [value, setValue] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [allInput, setAllInput] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [userInput, setUserInput] = useState({
    subject: "",
    lessoncontent: "",
    date: "",
  });

  function RedBar() {
    return (
      <Box
        sx={{
          height: 30,
          textAlign: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 0, 0, 0.1)"
              : "rgb(255 132 132 / 25%)",
        }}
      >
        <Typography variant="h6" color="primary">
          Please enter all fields{" "}
        </Typography>
      </Box>
    );
  }

  useEffect(() => {
    if (window.localStorage.getItem("lessonplan") === null) {
      setAllInput([]);
      window.localStorage.setItem("lessonplan", JSON.stringify(allInput));
      // console.log("null is triggered");
    } else {
      setAllInput(JSON.parse(window.localStorage.getItem("lessonplan")));
      // console.log("i am loaded");
    }
  }, []);

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
    setSubmit(false);
    if (userInput.subject && userInput.lessoncontent && value) {
      // console.log("i am clicked");
      let store = [...allInput, userInput];
      // console.log(store);
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
      setSubmit(true);
    } else {
      setInputError(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setUserInput({
      subject: "",
      lessoncontent: "",
      date: "",
    });
    setValue(null);
  };

  useEffect(() => {
    setAllInput(JSON.parse(window.localStorage.getItem("lessonplan")));
  }, [submit]);

  useEffect(() => {
    setUserInput({ ...userInput, date: value });
    // console.log("this is the date: " + userInput.date);
  }, [value]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="container">
          <CssBaseline />
          <Typography variant="h4" color="primary">
            Lesson Planning System
          </Typography>
          <div className="content-container">
            <div className="table-container">
              <div className="table-child">
                <DisplayTable data={allInput} />
                <br />
                <div className="add-button-container">
                  <div className="add-button">
                    <Button
                      size="large"
                      variant="outlined"
                      fullWidth={true}
                      onClick={handleAdd}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lessonplan-container">
              <div className="lessonplan-child">
                <Box component="form" noValidate autoComplete="off">
                  <div className="sameline">
                    <TextField
                      id="outlined-basic"
                      label="Subject Name"
                      variant="outlined"
                      name="subject"
                      value={userInput.subject}
                      onChange={handleChange}
                      sx={{ width: "85%" }}
                    />

                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Draft" />
                    </FormGroup>
                  </div>
                  <br />
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
                  <br />
                  <br />
                  <TextField
                    id="outlined-textarea"
                    label="Lesson Content"
                    multiline
                    rows={12}
                    sx={{ width: "100%" }}
                    variant="outlined"
                    name="lessoncontent"
                    value={userInput.lessoncontent}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <div className="button-container">
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                  <br />
                  {inputError ? <RedBar /> : ""}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
