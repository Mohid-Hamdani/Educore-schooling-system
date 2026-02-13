import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { verifyAuth } from './redux/actions/authActions';
import store from './redux/store';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(verifyAuth(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <AppRouter />;
};

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
