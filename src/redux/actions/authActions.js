import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

const authStart = () => ({
  type: AUTH_START
});

const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user
});

const authFail = (error) => ({
  type: AUTH_FAIL,
  payload: error
});

const logoutAction = () => ({
  type: LOGOUT
});

// Thunk Actions

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Serializing user object to avoid non-serializable data in Redux
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      };
      dispatch(authSuccess(user));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};

export const signupUser = (fullName, email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: fullName,
        photoURL: userCredential.user.photoURL
      };
      dispatch(authSuccess(user));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logoutAction());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
};

// Action to verify auth state changes (persistence)
export const verifyAuth = (user) => {
    if (user) {
        return authSuccess({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        });
    } else {
        return logoutAction();
    }
}
