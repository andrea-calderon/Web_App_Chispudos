import React from 'react';
import Signup from './../organisms/Signup';

const RegisterPage: React.FC = () => {
  const handleSignup = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log('Valores de registro:', values);
  };

  return (
    <div>
      <Signup onSignup={handleSignup} />
    </div>
  );
};

export default RegisterPage;
