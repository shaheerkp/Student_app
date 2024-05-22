import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import { setStudents } from "@/redux/slices/userSlice";
import { Student } from "@prisma/client";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import { useDispatch } from "react-redux";

function createData(
  name: string,
  age: number,
  totalMark: number,
  studentId: string
) {
  return { name, age, totalMark, studentId };
}

export default function StudentTable() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const studentDetails = useAppSelector((state) => state.user);

  const rows = studentDetails?.student?.map((ele) => {
    return createData(ele.name, ele.age, ele.totalMark, ele.studentId);
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getStudentData = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:3000/api/student?rows=${rowsPerPage}&skip=${page}`
      );
      dispatch(setStudents({ student: data.student, count: data.totalCount }));
    } catch (error) {
      alert("Error");
    }
  };

  useEffect(() => {
    getStudentData();
  }, [rowsPerPage, page]);
  return (
    <div>
      <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
        {rows.length > 0 && (
          <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Sl No</TableCell>
                <TableCell align="right">Student Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Total Mark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{i + 1}</TableCell>
                  <TableCell align="right">{row.studentId}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.totalMark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* <div>Total:{studentDetails.count.toString()}</div> */}
      </TableContainer>

      <TablePagination
        sx={{ maxWidth: 650 }}
        component="div"
        count={studentDetails.count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </div>
  );
}
