import axios from "axios";

const localUrl = axios.create({
  baseURL: process.env.LOCAL_URL || "http://localhost:3000",
});

export const FETCH_CLASSES_REQUEST = "FETCH_CLASSES_REQUEST";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAILURE = "FETCH_CLASSES_FAILURE";
export const FETCH_CLASSES_AND_STUDENTS_SUCCESS =
  "FETCH_CLASSES_AND_STUDENTS_SUCCESS";
export const FETCH_CLASSES_AND_STUDENTS_FAILURE =
  "FETCH_CLASSES_AND_STUDENTS_FAILURE";
export const FETCH_CLASSES_BY_TEACHER_SUCCESS =
  "FETCH_CLASSES_BY_TEACHER_SUCCESS";
export const FETCH_CLASSES_BY_TEACHER_FAILURE =
  "FETCH_CLASSES_BY_TEACHER_FAILURE";

export const fetchClasses = () => async (dispatch) => {
  dispatch({ type: FETCH_CLASSES_REQUEST });

  try {
    const response = await localUrl.get("/api/classes");
    dispatch({
      type: FETCH_CLASSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CLASSES_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchClassesAndStudentsByTeacher =
  (teacherIds) => async (dispatch) => {
    try {
      const response = await localUrl.get(
        `/api/teachers/classes-and-students?ids=${teacherIds.join(",")}`
      );
      dispatch({
        type: FETCH_CLASSES_AND_STUDENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CLASSES_AND_STUDENTS_FAILURE,
        payload: error.message,
      });
    }
  };

const initialState = {
  classes: [],
  students: [],
  loading: false,
  error: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASSES_REQUEST:
      return { ...state, loading: true };

    case FETCH_CLASSES_SUCCESS:
      return { ...state, loading: false, classes: action.payload, error: null };

    case FETCH_CLASSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_CLASSES_AND_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        classes: action.payload.classes,
        students: action.payload.students,
        error: null,
      };

    case FETCH_CLASSES_AND_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_CLASSES_BY_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        classes: action.payload,
        error: null,
      };

    case FETCH_CLASSES_BY_TEACHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default classReducer;
