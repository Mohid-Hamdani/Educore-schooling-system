import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant, type = 'button', onClick, disabled, fullWidth, size = 'medium', marginTop = '0', buttonStyle }) => {
  const baseStyle = {
    padding: size === 'large' ? '12px 24px' : '8px 16px',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    fontSize: size === 'large' ? '1rem' : '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  let variantStyle = {};
  if (variant === 'secondary') {
    variantStyle = {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--white)'
    };
  } else if (variant === 'danger') {
    variantStyle = {
      backgroundColor: 'var(--danger-color)',
      color: 'var(--white)'
    };
  } else {
    variantStyle = {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--white)'
    };
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const finalWrapperStyle = {
    marginTop: marginTop,
    width: fullWidth ? '100%' : 'auto'
  };

  return (
    <motion.div 
      style={finalWrapperStyle}
      className={typeof buttonStyle === 'string' ? buttonStyle : ''} 
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        type={type}
        style={{ ...baseStyle, ...variantStyle }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
