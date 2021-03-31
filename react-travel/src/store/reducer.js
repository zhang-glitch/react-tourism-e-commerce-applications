
import ActiveTypes from './actionTypes'

let defaultState = {
  user: {
    avatar: '',
    id: '',
    phone: '',
    sign: '',
    username: ''
  },
  searchData: {}
};

export default function reducer(state = defaultState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // 更新用户信息
    case ActiveTypes.USER_INFORMATION:
      newState.user = action.data;
      return newState;

    case ActiveTypes.SEARCH_DATE:
      newState.searchData = action.data;
      return newState
    default:
      return state;
  }
}