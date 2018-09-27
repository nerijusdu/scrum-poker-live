import { createStore } from 'redux';
import rootReducer from './reducers';

store = createStore(rootReducer);

export default store;