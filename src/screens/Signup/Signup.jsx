import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../redux/actions/authActions';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './Signup.module.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser(fullName, email, password));
  };

  return (
    // <div className={styles.container}>
      <div >
        <h2 className={styles.title}>Create Teacher Account</h2>
        <form onSubmit={handleSignup}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && (
            <div style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        <div className={styles.footer}>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    // </div>
  );
};

export default Signup;
