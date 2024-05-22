"use client";

// import Image from "next/image";
import axios from "axios";
import { setStudents } from "@/redux/slices/userSlice";
import { useState } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/redux/store";
import DialoagWindow from "./Components/DialoagWindow";
import DialogTitle from "@mui/material/DialogTitle";
import StudentTable from "./Components/StudentTable";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FilterComponent from "./Components/FilterComponent";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Student Details</DialogTitle>

        <DialogContent>
          <DialoagWindow setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: 650, padding: 5 }}>
          <Button
            sx={{ mb: 2 }}
            onClick={() => setOpen(!open)}
            variant="contained"
          >
            Add Student
          </Button>
          <FilterComponent />

          <StudentTable />
        </div>
      </div>
    </Provider>
  );
}
