import * as ActionConstants from '../constants/ActionConstants';

var defaultState = {
    xAuthToken: null
}


export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.GET_AUTH_TOKEN:
            return {
                ...state,
                xAuthToken : action.payload
            }
        case ActionConstants.GET_CACHE_AUTH_TOKEN:
            return{
                ...state,
                xAuthToken : action.payload
            }
        default:
            return state
    }
}