import { useDispatch, useSelector } from 'react-redux';
import { sendVerificationEmail } from '../../Slices/authSlice/emailVerificationSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.verification);
const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/email/verify`,
        { email } // Pass email as request payload
      );
      dispatch(sendVerificationEmail());
      navigate('/')
      console.log(response.data); // Access the response data
    } catch (error) {
      console.log(error.response.data);
    }
  };
  

  return (
    <div>
      <button onClick={handleResendVerification}>
        Verification Email: {email}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Verification email sent successfully!</p>}
    </div>
  );
};

export default MyComponent;
