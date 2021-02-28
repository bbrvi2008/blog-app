import { createSelector } from 'reselect';
import { createArticle, updateArticle, deleteArticle } from 'reducers/articles';
import * as RequestStatus from 'helpers/RequestStatus';
import { selectUser } from './user';

const selectArticlesState = state => state.articles;
const selectActionState = createSelector(selectArticlesState, state => state.action);

export const selectLoading = createSelector(selectArticlesState, state => state.action.status === RequestStatus.LOADING);
export const selectLoadingByActionType = (actionType) => {
  return createSelector(selectArticlesState, state => state.action.status === RequestStatus.LOADING && state.action.type === actionType);
}
export const selectCompleted = createSelector(selectArticlesState, state => state.action.status === RequestStatus.SUCCESS);
export const selectHasError = createSelector(selectArticlesState, state => state.action.status === RequestStatus.FAILURE);

export const selectHasArticles = createSelector(selectArticlesState, state => state.items.length > 0);
export const selectHasArticle = createSelector(selectArticlesState, state => state.item !== null);

export const selectArticles = createSelector(selectArticlesState, state => state.items);
export const selectArticle = createSelector(selectArticlesState, state => state.item);

export const selectCurrentPage = createSelector(selectArticlesState, state => state.currentPage);
export const selectCountItems = createSelector(selectArticlesState, state => state.countItems);

export const selectIsEditableArticle = createSelector(
  [selectUser, selectArticle],
  (currentUser, currentArticle) => {
    if(currentUser === null || currentArticle === null) return false;

    const { author } = currentArticle;
    return currentUser.username === author.username;
  }
);
export const selectIsCreatedArticle = createSelector(
  [selectActionState],
  action => {
    return action.type === createArticle.typePrefix && action.status === RequestStatus.SUCCESS;
  }
);
export const selectIsUpdatedArticle = createSelector(
  [selectActionState],
  action => {
    return action.type === updateArticle.typePrefix && action.status === RequestStatus.SUCCESS;
  }
);
export const selectIsDeletedArticle = createSelector(
  [selectActionState],
  action => {
    return action.type === deleteArticle.typePrefix && action.status === RequestStatus.SUCCESS;
  }
);