import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface StepData {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  isNextDisabled?: boolean;
  onHandleNext: () => void;
}

interface StepperState {
    steps: StepData[];
    currentStep: number;
  }

  const initialState: StepperState = {
    steps: [
      { onHandleNext: () => alert('handleSubmit desde Redux'), isNextDisabled: false, label: 'Step 1' },
      { onHandleNext: () => alert('Step 2 Redux'), isNextDisabled: false, label: 'Step 2' },
      { onHandleNext: () => alert('Step 3 Redux'), isNextDisabled: false, label: 'Step 3' },
      { onHandleNext: () => alert('Step 4 Redux'), isNextDisabled: false, label: 'Step 4' },
      { onHandleNext: () => alert('Step 5 Redux'), isNextDisabled: true, label: 'Step 5' },
      { onHandleNext: () => alert('Step 6 Redux'), isNextDisabled: true, label: 'Step 6' },
    ],
    currentStep: 0,
  };



  const serviceStepperSlice = createSlice({
    name: 'serviceStepper',
    initialState,
    reducers: {
      setCurrentStep      (state, action: PayloadAction<number>) {
        state.currentStep = action.payload;
      },
      setSteps(state, action: PayloadAction<StepData[]>) {
        state.steps = action.payload;
      },
      clearStepper(state) {
        state.currentStep = initialState.currentStep;
        state.steps = initialState.steps;
      }
    },
  });
  
  export const { setCurrentStep, setSteps, clearStepper } = serviceStepperSlice.actions;
  export const selectStepper = (state: RootState) => state.serviceStepper;

  export default serviceStepperSlice.reducer;

