import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Student } from "@/types";

interface DialogWindowProps {
  setOpen: (open: boolean) => void;
}

const DialoagWindow: React.FC<DialogWindowProps> = ({ setOpen }) => {
  const [studentDetails, setStudentDetails] = useState<Student>({
    name: "",
    age: 0,
    totalMark: 0,
    id: "",
    studentId: "",
  });
  const addStudent = () => {
    if (!studentDetails.name || !studentDetails.id) {
      alert("All fields are mandatory");
      return;
    }
    if (studentDetails.age === 0) {
      alert("Age cannot be 0");
      return;
    }
    axios
      .post("api/student", studentDetails)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        alert("User Failed");
      });
  };
  return (
    <div className="pt-3 flex justify-center">
      <div style={{ width: 290 }}>
        <TextField
          className="mb-3"
          value={studentDetails.id}
          id="Id"
          onChange={(e) =>
            setStudentDetails({ ...studentDetails, id: e.target.value })
          }
          label="Student Id"
        />
        <TextField
          className="mb-3"
          value={studentDetails.name}
          id="Name"
          onChange={(e) =>
            setStudentDetails({ ...studentDetails, name: e.target.value })
          }
          label="Student Name"
        />
        <TextField
          className="mb-3"
          id="'age"
          type="number"
          label="Student Age"
          value={studentDetails.age}
          onChange={(e) =>
            setStudentDetails({
              ...studentDetails,
              age: parseFloat(e.target.value),
            })
          }
        />
        <TextField
          className="mb-3"
          id="'age"
          label="Total Mark"
          type="number"
          value={studentDetails.totalMark}
          onChange={(e) =>
            setStudentDetails({
              ...studentDetails,
              totalMark: parseFloat(e.target.value),
            })
          }
        />
        <Button onClick={addStudent} variant="contained">
          Add
        </Button>
      </div>
    </div>
  );
};

export default DialoagWindow;
