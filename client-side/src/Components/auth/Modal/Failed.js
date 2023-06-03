import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router';

const Failed = () => {
    const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
        <button onClick={()=>navigate('/signin')}>Close</button>
      </Modal>
    </div>
  );
};

export default Failed;
