import * as ActionConstants from '../constants/ActionConstants';

var defaultState = {
    dispenserList: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.ADD_TO_DISPENSER:
            return {
                ...state,
                dispenserList: [...state.dispenserList, action.payload]
            }
        case ActionConstants.DELETE_FROM_DISPENSER:
            return {
                ...state,
                dispenserList:  state.dispenserList.filter(item => item !== action.payload),
            }
        default:
            return state
    }
}