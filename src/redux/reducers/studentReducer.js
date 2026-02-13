import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE
} from '../actions/studentActions';
import { ADD_OBSERVATION_SUCCESS } from '../actions/observationActions';

const initialState = {
  students: [],
  loading: false,
  error: null
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
        error: null
      };
    case ADD_OBSERVATION_SUCCESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.studentId
            ? {
                ...student,
                updatedAt: action.payload.observation.updatedAt,
                latestObservation: {
                  teacherName: action.payload.observation.teacherName,
                  date: action.payload.observation.date,
                  observationText: action.payload.observation.observationText,
                  nextStepText: action.payload.observation.nextStepText,
                  weakness: action.payload.observation.weakness,
                  strength: action.payload.observation.strength,
                  images: action.payload.observation.images,
                },
              }
            : student
        ),
      };
    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default studentReducer;
