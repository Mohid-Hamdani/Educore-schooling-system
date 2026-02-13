import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: -20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1 }
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'var(--panel-bg)',
    borderRadius: 'var(--border-radius)',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: 'var(--box-shadow)',
    position: 'relative'
  };

  const headerStyle = {
    marginBottom: '1rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-color)'
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={overlayStyle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            style={modalStyle}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {title && <div style={headerStyle}>{title}</div>}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
