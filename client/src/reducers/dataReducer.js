/* eslint-disable import/no-anonymous-default-export */
import {
    DATA
} from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case DATA:
            if (action.payload[0]) {
                if (action.payload[0].lists) {
                    return action.payload[0].lists;
                }
                return action.payload[0];
            }
            return action.payload;
        default:
            return state;
    }
}