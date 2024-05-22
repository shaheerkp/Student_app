import { Student } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: { student: Student[]; count: Number } | undefined = {
  student: [],
  count: 0,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStudents: (
      state,
      action: PayloadAction<{ student: Student[]; count: Number }>
    ) => {
      state.student = action.payload.student;
      state.count = action.payload.count;
    },
  },
});

export default UserSlice.reducer;

export const { setStudents } = UserSlice.actions;
