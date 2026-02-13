import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const layoutStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--box-shadow)',
    // Enforce light theme variables for auth screens
    '--text-color': '#1f2937',
    '--secondary-color': '#6b7280',
    '--bg-color': '#f3f4f6',
    '--primary-color': '#4f46e5',
    '--input-bg': '#ffffff' 
  };
  
  return (
    <div style={layoutStyle}>
      <div style={containerStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
