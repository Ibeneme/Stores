import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import './Profile.css'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
const navigate = useNavigate()
  const slides = [
    { content: 'My Account', color: '#386aeb', route: '/' },
    { content: 'Bank Details', route: '/bankprofile' },
    { content: 'Delivery Details', route: '/deliveryprofile' },
    { content: 'Orders', route: '/orders' },
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

  const handleSlideClick = (index) => {
    const slide = slides[index];

    if (slide.route) {
        navigate(slide.route);
    }
  };
  return (
    <div className='slider-web'
      style={{
   
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding:'1em 3em',
        gap:'2em',
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
              cursor: slide.route ? 'pointer' : 'default',
            }}
            onClick={() => handleSlideClick(index)}
          >
            {typeof slide === 'string' ? slide : slide.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
