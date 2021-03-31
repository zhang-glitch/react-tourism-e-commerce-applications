
import ActiveTypes from './actionTypes'

let defaultState = {
  user: {
    avatar: '',
    id: '',
    phone: '',
    sign: '',
    username: ''
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    // 更新用户信息
    case ActiveTypes.USER_INFORMATION:

      let newState = JSON.parse(JSON.stringify(state));
      newState.user = action.data;
      return newState;

    default:
      return state;
  }
}