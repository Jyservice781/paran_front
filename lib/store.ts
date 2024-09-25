import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user.Slice';
import fileSlice from './features/file.Slice';
import roomSlice from './features/room.Slice';
import addressSlice from './features/address.Slice';
import accountSlice from './features/account.Slice';
import reviewSlice from './features/review.Slice';
import groupSlice from './features/group.Slice';
import bookingsSlice from './features/bookings.Slice';
import errorSlice from './features/error.Slice';
import commentSlice from './features/comment.Slice';
import chatSlice from './features/chat.Slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      file: fileSlice,
      room: roomSlice,
      address: addressSlice,
      account: accountSlice,
      review: reviewSlice,
      group: groupSlice,
      bookings: bookingsSlice,
      error: errorSlice,
      comment: commentSlice,
      chat: chatSlice,
    },
  });
};

// 스토어 타입을 정의합니다.
export type AppStore = ReturnType<typeof makeStore>;
// RootState와 AppDispatch 타입을 추론합니다.
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];