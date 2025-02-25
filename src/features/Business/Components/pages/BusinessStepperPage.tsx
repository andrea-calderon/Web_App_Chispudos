import { useState } from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import CustomStepper from '../../../../components/organisms/Stepper';
import { StepData } from '../../../../components/organisms/Stepper';
import Step1 from '../Organisms/Step1';
import Step2 from '../Organisms/Step2';
import Step3 from '../Organisms/Step3';
import Step4 from '../Organisms/Step4';
import Step5 from '../Organisms/Step5';
import Step6 from '../Organisms/Step6';
import { Box } from '@mui/material';

const steps: StepData[] = [
  { label: '', description: 'Primer paso' },
  { label: '', description: 'Segundo paso' },
  { label: '', description: 'Tercer paso' },
  { label: '', description: 'Cuarto paso' },
  { label: '', description: 'Quinto paso' },
  { label: '', description: 'Sexto paso' },
];

export const BusinessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState(null);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <Step1 onNextStep={handleNextStep} setUserId={setUserId} />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      case 5:
        return <Step6 />;
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <Box sx={{ minHeight: 'calc(100vh - 80px)', pb: '80px' }}>
        {renderStepComponent()}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CustomStepper
          steps={steps}
          onStepChange={setActiveStep}
          activeStep={activeStep}
        />
      </Box>
    </UserLayout>
  );
};
