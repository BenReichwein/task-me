import { combineReducers } from 'redux';
import taskReducer from './taskReducer'

// In redux this is where we combine the states

export default combineReducers({
    task: taskReducer,
})