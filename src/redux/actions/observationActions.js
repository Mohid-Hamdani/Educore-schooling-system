import { log } from 'firebase/firestore/pipelines';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy, addDoc, doc, updateDoc } from 'firebase/firestore';

// Action Types
export const FETCH_OBSERVATIONS_REQUEST = 'FETCH_OBSERVATIONS_REQUEST';
export const FETCH_OBSERVATIONS_SUCCESS = 'FETCH_OBSERVATIONS_SUCCESS';
export const FETCH_OBSERVATIONS_FAILURE = 'FETCH_OBSERVATIONS_FAILURE';

export const ADD_OBSERVATION_REQUEST = 'ADD_OBSERVATION_REQUEST';
export const ADD_OBSERVATION_SUCCESS = 'ADD_OBSERVATION_SUCCESS';
export const ADD_OBSERVATION_FAILURE = 'ADD_OBSERVATION_FAILURE';

// Action Creators
export const fetchObservationsByStudent = (studentId) => async (dispatch) => {
  dispatch({ type: FETCH_OBSERVATIONS_REQUEST });

  try {
    const q = query(
      collection(db, 'observations'),
      where('studentId', '==', studentId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const observations = [];
    querySnapshot.forEach((doc) => {
      observations.push({ id: doc.id, ...doc.data() });
    });
    console.log("Observations:", observations);
    dispatch({
      type: FETCH_OBSERVATIONS_SUCCESS,
      payload: { studentId, observations }
    });
  } catch (error) {
    console.error("Error fetching observations:", error);
    dispatch({
      type: FETCH_OBSERVATIONS_FAILURE,
      payload: error.message
    });
  }
};

export const addObservation = (observationData) => async (dispatch) => {
  dispatch({ type: ADD_OBSERVATION_REQUEST });

  try {
    const { studentId } = observationData;
    const timestamp = new Date();
    
    const observationWithTimestamp = {
      ...observationData,
      updatedAt: timestamp,
      createdAt: timestamp
    };

    // 1. Add to observations collection
    const docRef = await addDoc(collection(db, 'observations'), observationWithTimestamp);
    const newObservation = { id: docRef.id, ...observationWithTimestamp };

    // 2. Update student document with latest observation summary
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      updatedAt: timestamp,
      latestObservation: {
        teacherName: observationData.teacherName,
        date: timestamp,
        observationText: observationData.observationText,
        nextStepText: observationData.nextStepText,
        weakness: observationData.weakness,
        strength: observationData.strength,
        images: observationData.images
      }
    });

    dispatch({
      type: ADD_OBSERVATION_SUCCESS,
      payload: { studentId, observation: newObservation }
    });

    return newObservation;
  } catch (error) {
    console.error("Error adding observation:", error);
    dispatch({
      type: ADD_OBSERVATION_FAILURE,
      payload: error.message
    });
    throw error;
  }
};
