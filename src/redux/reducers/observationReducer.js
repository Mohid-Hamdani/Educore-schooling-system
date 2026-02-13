import {
  FETCH_OBSERVATIONS_REQUEST,
  FETCH_OBSERVATIONS_SUCCESS,
  FETCH_OBSERVATIONS_FAILURE,
  ADD_OBSERVATION_REQUEST,
  ADD_OBSERVATION_SUCCESS,
  ADD_OBSERVATION_FAILURE
} from '../actions/observationActions';

const initialState = {
  observationsByStudent: {}, // Key: studentId, Value: array of observations
  loading: false,
  error: null
};

const observationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBSERVATIONS_REQUEST:
    case ADD_OBSERVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_OBSERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        observationsByStudent: {
          ...state.observationsByStudent,
          [action.payload.studentId]: action.payload.observations
        },
        error: null
      };
    case ADD_OBSERVATION_SUCCESS:
      const studentId = action.payload.studentId;
      const existingObs = state.observationsByStudent[studentId] || [];
      return {
        ...state,
        loading: false,
        observationsByStudent: {
          ...state.observationsByStudent,
          [studentId]: [action.payload.observation, ...existingObs]
        },
        error: null
      };
    case FETCH_OBSERVATIONS_FAILURE:
    case ADD_OBSERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default observationReducer;
