/* eslint-disable import/no-anonymous-default-export */
import {
    TASK
} from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case TASK:
            return action.payload;
        default:
            return state;
    }
}