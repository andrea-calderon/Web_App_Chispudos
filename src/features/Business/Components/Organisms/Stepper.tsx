import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { ButtonAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import {
  selectStepper,
  setCurrentStep,
} from '../../../../redux/slices/serviceStepperSlice';
interface StepperProps {
  label?: string;
  icon?: React.ReactNode;
  isNextEnabled?: boolean;
  onHandleNext: () => void | Promise<void>;
  //steps: StepData[];
  // onStepChange?: (step: number) => void;
  isLinear?: boolean;
  // isValidStep?: (step: number) => boolean; //conditional to enable next | back button
  totalSteps?: number;
}

const CustomStepper: React.FC<StepperProps> = ({
  label,
  icon,
  isNextEnabled = false,
  onHandleNext,
  isLinear = true,
  totalSteps = 6,
}) => {
  const dispatch = useAppDispatch();
  const { currentStep: activeStep } = useAppSelector(selectStepper);

  const handleNextStep = () => {
    onHandleNext();
    dispatch(setCurrentStep(activeStep + 1));
  };

  const handleBackStep = () => {
    //dispatch(setCurrentStep(prevStep));
    dispatch(setCurrentStep(activeStep - 1));
  };

  return (
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
      <Box sx={{ maxWidth: '800px', width: '90%', mx: 'auto', mt: 6, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel={!isLinear}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <Step key={index}>
              <StepLabel>{icon || label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ButtonAtom disabled={activeStep === 0} onClick={handleBackStep}>
            Back
          </ButtonAtom>
          <ButtonAtom onClick={handleNextStep} disabled={!isNextEnabled}>
            {activeStep === totalSteps ? 'Finish' : 'Next'}
          </ButtonAtom>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomStepper;
