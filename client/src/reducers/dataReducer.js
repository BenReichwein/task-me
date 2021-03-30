/* eslint-disable import/no-anonymous-default-export */
import {
    DATA
} from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case DATA:
            return action.payload[0].lists;
        default:
            return state;
    }
}