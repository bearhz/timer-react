import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import formatTimeFromMinutes from '../helper/time-transfer';

export const startTimer = createAsyncThunk(
  'startStatus', () => { }
);
export const stopTimer = createAsyncThunk(
  'stopStatus', () => { }
);


export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    running: false,
    value: 0, //sec
    digTime: '00:00',
    alarmSource: null,
  },
  reducers: {
    increase: (state) => {
      if (!state.running) {
        const factor = 60; //sec
        const maxMinLimt = 26; //min
        let maxSecLimit = maxMinLimt * factor;
        if (state.value < maxSecLimit) {
          state.value = state.value + factor;
          state.digTime = formatTimeFromMinutes(state.value);
        }
      }
    },
    decrease: (state) => {
      if (!state.running) {
        const factor = 60; //sec
        if (state.value > 0) {
          state.value = state.value - factor;
          state.digTime = formatTimeFromMinutes(state.value);
        }
      }
    },
    reset: (state) => {
      if (!state.running) {
        state.value = 0;
        state.digTime = formatTimeFromMinutes(state.value);
      }
    },
    alarm: (state) => {
      state.alarmSource.play();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startTimer.fulfilled, (state) => {
      state.running = true;
      const factor = 1; //sec
      if (state.value > 0) {
        state.value = state.value - factor;
        state.digTime = formatTimeFromMinutes(state.value);
      }
    })
      .addCase(stopTimer.fulfilled, (state) => {
        state.running = false;
      })
  }
})

// Action creators are generated for each case reducer function
export const { increase, decrease, reset, alarm } = timerSlice.actions

export default timerSlice.reducer