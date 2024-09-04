import axios from "axios";

export const FETCH_TEACHERS_SUCCESS = "FETCH_TEACHERS_SUCCESS";
export const FETCH_TEACHERS_FAILURE = "FETCH_TEACHERS_FAILURE";

const localUrl = axios.create({
  baseURL: process.env.LOCAL_URL || "http://localhost:3000",
});

const initialState = {
  teachers: [],
  loading: false,
  error: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_TEACHERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teacherReducer;

export const fetchTeachers = () => async (dispatch) => {
  try {
    const response = await localUrl.get("/api/teachers");
    dispatch({ type: FETCH_TEACHERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TEACHERS_FAILURE, payload: error.message });
  }
};
