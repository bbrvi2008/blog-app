import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ArticlesApiService from 'services/ArticlesApiService';
import * as RequestStatus from 'helpers/RequestStatus';
import { isFulfilledAction, isRejectedAction, isPendingAction, getActionType } from './helpers';

const articlesAPI = new ArticlesApiService();

export const fetchArticles = createAsyncThunk(
  'articles/fetchList',
  async (page) => {
    const { data } = await articlesAPI.fetchAll(page);

    const { articles, articlesCount } = data;
    return {
      currentPage: page,
      articlesCount,
      articles
    };
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (slug) => {
    const { data } = await articlesAPI.fetchItem(slug);

    return data;
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData) => {
    const { data } = await articlesAPI.createItem(articleData);

    return data;
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async (articleData) => {
    const { data } = await articlesAPI.updateItem(articleData);

    return data;
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (slug) => {
    await articlesAPI.deleteItem(slug);
  }
);

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug) => {
    const { data } = await articlesAPI.favoriteItem(slug);

    return data;
  }
);

export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async (slug) => {
    const { data } = await articlesAPI.unfavoriteItem(slug);

    return data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    item: null,
    countItems: 0,
    currentPage: 1,
    action: {
      type: '',
      status: RequestStatus.IDLE,
      error: null
    }
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchArticles.fulfilled,
        (state, { payload }) => {
          const { articles, articlesCount, currentPage } = payload;
          state.items = articles;
          state.countItems = articlesCount;
          state.currentPage = currentPage;
        }
      )
      .addCase(
        fetchArticle.fulfilled,
        (state, { payload }) => {
          const { article } = payload;
          state.item = article;
        }
      )
      .addCase(
        favoriteArticle.fulfilled,
        (state, { payload }) => {
          const { article: articleData } = payload;
          state.item = articleData;
          if(state.items.length > 0) {
            const index = state.items.findIndex(article => article.slug === articleData.slug);
            state.items[index] = articleData;
          }
        }
      )
      .addCase(
        unfavoriteArticle.fulfilled,
        (state, { payload }) => {
          const { article: articleData } = payload;
          state.item = articleData;
          if(state.items.length > 0) {
            const index = state.items.findIndex(article => article.slug === articleData.slug);
            state.items[index] = articleData;
          }
        }
      )
      .addMatcher(
        isPendingAction("articles/"),
        (state, action) => {
          state.action.type = getActionType(action);
          state.action.status = RequestStatus.LOADING;
        }
      )
      .addMatcher(
        isFulfilledAction("articles/"),
        (state, action) => {
          state.action.type = getActionType(action);
          state.action.status = RequestStatus.SUCCESS;
        }
      )
      .addMatcher(
        isRejectedAction("articles/"),
        (state, action) => {
          state.action.type = getActionType(action);
          state.action.status = RequestStatus.FAILURE;
        }
      )
  }
});

export default articlesSlice.reducer;
// export const { } = articlesSlice.actions;