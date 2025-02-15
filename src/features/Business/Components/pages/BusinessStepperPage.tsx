import { useState } from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import CustomStepper from '../../../../components/organisms/Stepper';
import { StepData } from '../../../../components/organisms/Stepper';
import Step4 from '../Organisms/Step4';
import Step5 from '../Organisms/Step5';
import Step6 from '../Organisms/Step6';

const steps: StepData[] = [
  { label: 'Paso 1', description: '¿Ofreces otros servicios?' },
  { label: 'Paso 2', description: 'Define tu precio promedio' },
  { label: 'Paso 3', description: '¡Felicidades!' },
];

export const BusinessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  
  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <Step4 />;
      case 1:
        return <Step5 />;
      case 2:
        return <Step6 />;
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      {renderStepComponent()} 
      <CustomStepper steps={steps} onStepChange={handleStepChange} />
    </UserLayout>
  );
};
