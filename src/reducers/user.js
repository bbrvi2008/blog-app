import UserApiService from 'services/UserApiService';
import StorageValue from 'helpers/StorageValue';

const userAPI = new UserApiService();
const userStorable = new StorageValue("userData");

const USER_FETCH_PENDING = 'user:fetch-pending';
const USER_FETCH_SUCCESS = 'user:fetch-success';
const USER_FETCH_ERROR = 'user:fetch-error';
const USER_LOGOUT = 'user:logout';

const initialState = {
  user: userStorable.getValue(),
  loading: false,
  error: null
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_FETCH_PENDING:
      return {
        ...state,
        loading: true
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: payload
      }
    case USER_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: null
      }
  
    default:
      return state;
  }
}

const fetchUserPending = () => ({ type: USER_FETCH_PENDING });
const fetchUserSuccess = (payload) => ({ type: USER_FETCH_SUCCESS, payload });
const fetchUserError = (payload) => ({ type: USER_FETCH_ERROR, payload });
const logOut = () => ({ type: USER_LOGOUT });

const createUserAction = request => user => async dispatch => {
  dispatch(fetchUserPending());
  try {
    const { success, data } = await request(user);
    if(success) {
      const { user: responseUser } = data;
      
      userStorable.setValue(responseUser);
      dispatch(fetchUserSuccess(responseUser));
    } else {
      const { errors } = data;
      dispatch(fetchUserError(errors));
    }
  } catch (e) {
    dispatch(fetchUserError());
  }
}

export const registrationUser = createUserAction(userAPI.registration);
export const authenticationUser = createUserAction(userAPI.authentication);
export const updateUser = createUserAction(userAPI.updateUser);


export const logOutUser = () => {
  userStorable.removeValue();
  return logOut();
}
