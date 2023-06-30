// import React from 'react'
// import { useEffect, useState } from 'react';




// const ScrollToTheTop = () => {
//     const [showButton, setShowButton] = useState(false);
// const handleScroll = () => {
//     if (window.pageYOffset > 100) {
//       setShowButton(true);
//     } else {
//       setShowButton(false);
//     }
//   };
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };


//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div>
//         <div></div>
//           {showButton && (
//         <button 
//         style={{
//             position:'sticky'
//         }}
        
//         className="scroll-to-top" onClick={scrollToTop}>
//           Scroll to Top
//         </button>
//       )}
//     </div>
//   )
// }

// export default ScrollToTheTop