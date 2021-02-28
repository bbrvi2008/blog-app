import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import UserApiService from 'services/UserApiService';
import StorageValue from 'helpers/StorageValue';
import * as RequestStatus from 'helpers/RequestStatus';
import { isFulfilledAction, isRejectedAction, isPendingAction } from './helpers';

const userAPI = new UserApiService();
const userStorable = new StorageValue("userData");

const userAction = request => {
  return async (userData, { rejectWithValue }) => {
    const { data, success } = await request(userData);
    if(!success) {
      return rejectWithValue(data);
    }

    const { user } = data;
    userStorable.setValue(user);

    return data;
  }
}

export const registrationUser = createAsyncThunk(
  'user/registrationUser',
  userAction(userAPI.registration)
);

export const authenticationUser = createAsyncThunk(
  'user/authenticationUser',
  userAction(userAPI.authentication)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  userAction(userAPI.updateUser)
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userStorable.getValue(),
    error: null,
    status: RequestStatus.IDLE
  },
  reducers: {
    resetUserStore: (state, action) => {
      state.status = RequestStatus.IDLE;
      state.error = null;
    },
    logOutUser: (state, action) => {
      state.user = null;
      userStorable.removeValue();
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPendingAction("user/"),
        (state, action) => {
          state.status = RequestStatus.LOADING;
        }
      )
      .addMatcher(
        isFulfilledAction("user/"),
        (state, { payload }) => {
          state.status = RequestStatus.SUCCESS;

          const { user } = payload;
          state.user = user;
        }
      )
      .addMatcher(
        isRejectedAction("user/"),
        (state, { payload }) => {
          state.status = RequestStatus.FAILURE;

          const { errors } = payload;
          state.error = errors;
        }
      )
  }
});

export default userSlice.reducer;
export const { logOutUser, resetUserStore } = userSlice.actions;