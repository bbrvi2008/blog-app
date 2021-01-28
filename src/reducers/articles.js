import ArticlesApiService from '../services/ArticlesApiService';

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
  loading: false
};

const reducer = (state = initialState, action) => {
  if(!action) {
    return state;
  }

  switch (action.type) {
    case ARTICLES_FETCH:
      return {
        ...state,
        loading: true
      };
    case ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
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

export default reducer;