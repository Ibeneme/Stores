import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalStyles = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: 'fit-content',
    margin: '1em',
    textAlign:'centre',
  };

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
