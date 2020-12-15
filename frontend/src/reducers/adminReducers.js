import * as actions from '../constants/adminConstants';

export const adminListUsersReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case actions.ADMIN_LIST_USERS_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_LIST_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case actions.ADMIN_LIST_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_LIST_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actions.ADMIN_UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_UPDATE_USER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADMIN_DELETE_USER_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
