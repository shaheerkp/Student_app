import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAppDispatch } from "@/redux/store";
import { setStudents } from "@/redux/slices/userSlice";
import Button from "@mui/material/Button";
import { error } from "console";

const FilterComponent = () => {
  const useDispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const [searchParams, setFilterParams] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const handleSearch = async () => {
    if (!searchParams) {
      alert("Select Field to search");
      return;
    }
    try {
      let { data } = await axios.get(
        `http://localhost:3000/api/student?key=${searchParams}&value=${searchKeyWord}`
      );

      useDispatch(
        setStudents({ student: data.student, count: data.totalCount })
      );
    } catch (error) {}
    alert(error);
  };

  return (
    <div style={{ display: "flex" }}>
      <FormControl size="small" sx={{ width: 150, mr: 3 }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="dSearch"
          id="Search"
          value={searchParams}
          label="Search"
          onChange={(e) => setFilterParams(e.target.value)}
        >
          <MenuItem value={"name"}> Name</MenuItem>
          <MenuItem value={"studentId"}> Id</MenuItem>
          <MenuItem value={"totalMark"}>Totalmark</MenuItem>
          <MenuItem value={"age"}>Age</MenuItem>
        </Select>
      </FormControl>

      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        value={searchKeyWord}
        onChange={(e) => setSearchKeyWord(e.target.value)}
      />
      <Button sx={{ mb: 2, ml: 2 }} onClick={handleSearch} variant="contained">
        Search
      </Button>
    </div>
  );
};

export default FilterComponent;
