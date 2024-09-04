import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/studentReducer";
import teacherReducer from "./slices/teacherReducer";
import classReducer from "./slices/classReducer";

const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    classes: classReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
