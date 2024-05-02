import React from 'react';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import axios from 'axios';
import { GoogleLoginResponse } from 'react-google-login';

const LoginPage: React.FC = () => {
  const handleSuccess = async (response: GoogleLoginResponse) => {
    // Here you might send the authorization code to the backend for verification and exchange
    try {
      const { data } = await axios.post('/api/verify-google-token', {
        token: response.tokenId  // Assuming you are using token-based flow, not code
      });
      console.log('Backend verification success:', data);
      // Handle JWT storage or session management here
    } catch (error) {
      console.error('Error verifying token with backend:', error);
    }
  };

  const handleFailure = (error: any) => {
    console.error('Google Login Failure:', error);
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLoginButton onSuccess={handleSuccess} onFailure={handleFailure} />
    </div>
  );
};

export default LoginPage;
