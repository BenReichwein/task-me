import { combineReducers } from 'redux';
import dataReducer from './dataReducer'

// In redux this is where we combine the states

export default combineReducers({
    data: dataReducer
})