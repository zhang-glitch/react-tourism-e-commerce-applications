
import { createStore } from "redux";
import reducer from './reducer'

// 参数二，表示使用redux-tools插件
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;