import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, name, required }) => {
  const containerStyle = {
    marginBottom: '1rem',
    width: '100%'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--text-color)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        style={inputStyle}
      />
    </div>
  );
};

export default Input;
