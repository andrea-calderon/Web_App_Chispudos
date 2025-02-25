import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { ButtonAtom } from '../atoms';

export interface StepData {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  onHandleNext?: () => void;
}

interface StepperProps {
  steps: StepData[];
  onStepChange?: (step: number) => void;
  isLinear?: boolean;
  isValidStep?: (step: number) => boolean;
}

const CustomStepper: React.FC<StepperProps> = ({
  steps,
  onStepChange,
  isLinear = true,
  isValidStep,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    if (isValidStep && !isValidStep(activeStep)) {
      return;
    }
    const nextStep = Math.min(activeStep + 1, steps.length - 1);
    setActiveStep(nextStep);
    onStepChange?.(nextStep);
  };

  const handleBackStep = () => {
    const prevStep = Math.max(activeStep - 1, 0);
    setActiveStep(prevStep);
    onStepChange?.(prevStep);
  };

  return (
    <Box sx={{ maxWidth: '800px', width: '90%', mx: 'auto', mt: 6, mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel={!isLinear}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.icon || step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <ButtonAtom disabled={activeStep === 0} onClick={handleBackStep}>
          Back
        </ButtonAtom>
        <ButtonAtom onClick={handleNextStep}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </ButtonAtom>
      </Box>
    </Box>
  );
};

export default CustomStepper;
