import axios from "axios";

export const FETCH_STUDENTS_REQUEST = "FETCH_STUDENTS_REQUEST";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILURE = "FETCH_STUDENTS_FAILURE";

export const FETCH_STUDENTS_BY_CLASS_REQUEST =
  "FETCH_STUDENTS_BY_CLASS_REQUEST";
export const FETCH_STUDENTS_BY_CLASS_SUCCESS =
  "FETCH_STUDENTS_BY_CLASS_SUCCESS";
export const FETCH_STUDENTS_BY_CLASS_FAILURE =
  "FETCH_STUDENTS_BY_CLASS_FAILURE";

const localUrl = axios.create({
  baseURL: process.env.LOCAL_URL || "http://localhost:3000",
});

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });

  try {
    const response = await localUrl.get("/api/students");
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
  }
};

export const fetchStudentsByClass = (classId) => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_BY_CLASS_REQUEST });

  try {
    const response = await localUrl.get(`/api/classes/${classId}/students`);
    dispatch({
      type: FETCH_STUDENTS_BY_CLASS_SUCCESS,
      payload: { classId, students: response.data },
    });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_BY_CLASS_FAILURE, payload: error.message });
  }
};

const initialState = {
  loading: false,
  students: [],
  studentsByClass: {},
  error: "",
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_STUDENTS_SUCCESS:
      return { ...state, loading: false, students: action.payload, error: "" };

    case FETCH_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_STUDENTS_BY_CLASS_REQUEST:
      return { ...state, loading: true };

    case FETCH_STUDENTS_BY_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        studentsByClass: {
          ...state.studentsByClass,
          [action.payload.classId]: action.payload.students,
        },
        error: "",
      };

    case FETCH_STUDENTS_BY_CLASS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default studentReducer;
