import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AuthLayout from '../components/AuthLayout';
import AppLayout from '../components/AppLayout';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import Dashboard from '../screens/Dashboard/Dashboard';
import AddObservation from '../screens/observations/AddObservation';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
           {/* Login has its own layout structure */}
          <Route path="/login" element={<Login />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/students/add-observation" element={<AddObservation />} />
          </Route>
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
