import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import { ArrowLeftOutlined } from '@ant-design/icons';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isObservationPage = location.pathname === '/students/add-observation';

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'var(--panel-bg)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)'
  };

  const backIconStyle = {
    cursor: 'pointer',
    fontSize: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--primary-color)',
    transition: 'transform 0.2s'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem'
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <div style={logoStyle}>
          {isObservationPage && (
            <div 
              style={backIconStyle} 
              onClick={() => navigate('/dashboard')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <ArrowLeftOutlined />
            </div>
          )}
          {isObservationPage ? 'Add Observation' : 'Educore Dashboard'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />
          <Button variant="secondary" onClick={handleLogoutClick}>Logout</Button>
        </div>
      </nav>
      
      <Modal 
        isOpen={isLogoutModalOpen} 
        onClose={cancelLogout}
        title="Confirm Logout"
      >
        <p>Are you sure you want to logout?</p>
        <div style={modalActionsStyle}>
          <Button variant="secondary" onClick={cancelLogout}>Cancel</Button>
          <Button variant="danger" onClick={confirmLogout}>Logout</Button>
        </div>
      </Modal>

      <main style={{ padding: '0 2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
