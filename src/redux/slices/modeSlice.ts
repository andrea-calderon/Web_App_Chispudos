import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModeState = 'Admin' | 'User' | 'Merchant';

const initialState: ModeState = 'user';

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<ModeState>) {
      return action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export const selectMode = (state: { mode: ModeState }) => state.mode;
export default modeSlice.reducer;