import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { content: 'My Account', color: 'red' },
    'Bank Details',
    'Delivery Details',
    'Orders',
    'Help',
    'Log Out',
  ];

  const handleScroll = () => {
    const slideWidth = window.innerWidth;
    const scrollPosition = window.scrollX;
    const activeSlide = Math.round(scrollPosition / slideWidth);

    setCurrentSlide(activeSlide);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollbarStyles = {
    visibility:'hidden'
  };
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding:'1em 3em',
        borderRadius:'0.3em',
        scrollbarStyles,
      }}
    >
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.3s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
        
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 30%',
              width: '10%',
              color: index === 0 ? slide.color : 'inherit',
            }}
          >
        
            {typeof slide === 'string' ? slide : slide.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
