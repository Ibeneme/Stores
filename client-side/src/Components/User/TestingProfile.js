// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCredentials } from '../../Slices/userSlice';
// import { userProfile } from '../../Slices/userSlice';
// import { useNavigate } from 'react-router';

// const ProfileForm = () => {
//  const auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
// const navigate = useNavigate()


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userData = auth.userData
//     console.log(userData)
//    try {
//      const result = await  dispatch(setCredentials(userData));
//      console.log(result)
//       if (result.type === userProfile.fulfilled) {
//         console.log('success')
//         navigate("/");
//      } else {
//      }
//      } catch (error) {
//      console.log(error);
//     }
//   };
 

//   return (
//     <div>
     
//       <h1>Update Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <button
//         type='submit'> Here</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
