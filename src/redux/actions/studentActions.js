import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// Action Types
export const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

// Action Creators
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });

  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    // console.log("=========>>>>>>>querySnapshot", );
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });

    // console.log("Fetched " + students.length + " students from Firestore");

    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: students
    });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error.message
    });
  }
};
