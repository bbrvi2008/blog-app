import ArticlesApiService from 'services/ArticlesApiService';

const articlesAPI = new ArticlesApiService();

const ARTICLES_FETCH = 'articles:fetch';
const ARTICLES_FETCH_FAILURE = 'articles:fetch-failure';
const ARTICLES_FETCH_SUCCESS = 'articles:fetch-success';


const initialState = {
  items: [],
  item: null,
  countItems: 0,
  currentPage: 1,
  error: false,
  loading: false,
  completed: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ARTICLES_FETCH:
      return {
        ...state,
        item: null,
        loading: true,
        completed: false
      };
    case ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case ARTICLES_FETCH_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };

    default:
      return state;
  }
}

const atriclesLoading = () => ({type: ARTICLES_FETCH});
const atriclesNotReceived = () => ({type: ARTICLES_FETCH_FAILURE});
const atriclesReceived = (payload) => ({type: ARTICLES_FETCH_SUCCESS, payload});

export const fetchAtricles = (page) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.fetchAll(page);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const fetchAtricle = (slug) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.fetchItem(slug);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const createAtricle = (articleData) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.createItem(articleData);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const updateAtricle = (articleData) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.updateItem(articleData);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const deleteAtricle = (slug) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.deleteItem(slug);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const favoriteAtricle = (slug) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.favoriteItem(slug);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}

export const unfavoriteAtricle = (slug) => async dispatch => {
  dispatch(atriclesLoading());
  try {
    const payload = await articlesAPI.unfavoriteItem(slug);
    dispatch(atriclesReceived(payload));
  } catch (e) {
    dispatch(atriclesNotReceived());
  }
}