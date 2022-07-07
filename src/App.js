import "./App.css";
import React, { useState, useRef } from "react";
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
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="dd-MM-yyyy"
            />
          </LocalizationProvider>
        </Box>
      </Container>
    </div>
  );
}

export default App;
