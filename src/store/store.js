import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timer-reducer';

export default configureStore({
  reducer: {
    timer: timerReducer,
  },
})