import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../../redux/actions/authActions';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const leftBoxVariants = {
    hidden: { 
      x: isMobile ? 0 : -60, 
      y: isMobile ? -20 : 0, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const rightBoxVariants = {
    hidden: { 
      x: isMobile ? 0 : 60, 
      y: isMobile ? 20 : 0, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.wrapper}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.left}
          initial="hidden"
          animate="visible"
          variants={leftBoxVariants}
        >
          <div className={styles.leftContent}>
            <h1>Educore School Dashboard</h1>
            <p>Teacher Portal Login</p>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.right}
          initial="hidden"
          animate="visible"
          variants={rightBoxVariants}
        >
          <div className={styles.formContainer}>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
            >
              Please login to continue
            </motion.p>
            
            <motion.form 
              onSubmit={handleLogin}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '10px', marginBottom: '10px' }}
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" fullWidth disabled={loading} size="large" marginTop="1.5rem">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </motion.form>
            
            <motion.div 
              className={styles.footer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
