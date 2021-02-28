import { createSelector } from 'reselect';

import * as RequestStatus from 'helpers/RequestStatus';

const selectUserState = state => state.user;

export const selectLoading = createSelector(selectUserState, state => state.status === RequestStatus.LOADING);
export const selectHasError = createSelector(selectUserState, state => state.status === RequestStatus.FAILURE);
export const selectCompleted = createSelector(selectUserState, state => state.status === RequestStatus.SUCCESS);
export const selectUser = createSelector(selectUserState, state => state.user);
export const selectError = createSelector(selectUserState, state => state.error);
export const selectIsAuthenticated = createSelector(selectUserState, state => state.user !== null);