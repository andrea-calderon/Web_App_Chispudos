import { useState } from 'react';
import ForgotPasswordForm from '../organisms/ForgotPasswordForm';
import OTPVerification from '../organisms/OTPVerification';
import PasswordResetSuccess from '../organisms/PasswordResetSuccess';
import SetNewPassword from '../organisms/SetNewPassword';
import PasswordUpdateSuccess from '../organisms/PasswordUpdateSuccess';
import AuthLayout from '../templates/AuthLayout';

const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleSecondScreen = () => {
    setStep(2);
  };

  const onOtpReceived = (otp: string) => {
    setOtp(otp);
    setStep(2);
  };

  const handleNextScreen = () => {
    setStep(3);
  };

  const handleNextToSetPassword = () => {
    setStep(4);
  };

  const handlePasswordUpdated = () => {
    setStep(5);
  };

  return (
    <AuthLayout>
      {step === 1 && (
        <ForgotPasswordForm handleSecondScreen={handleSecondScreen} />
      )}
      {step === 2 && (
        <OTPVerification
          onOtpReceived={onOtpReceived}
          onNext={handleNextScreen}
        />
      )}
      {step === 3 && <PasswordResetSuccess onNext={handleNextToSetPassword} />}
      {step === 4 && (
        <SetNewPassword otp={otp} onSuccess={handlePasswordUpdated} />
      )}
      {step === 5 && <PasswordUpdateSuccess />}
    </AuthLayout>
  );
};

export default PasswordRecovery;
