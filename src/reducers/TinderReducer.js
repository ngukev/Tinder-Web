import * as ActionConstants from '../constants/ActionConstants';

var defaultState = {
    recommendationList: [],
    teaserList: [],

}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_RECOMMENDATIONS:
            return {
                ...state,
                recommendationList: action.payload
            }
        case ActionConstants.FETCH_TEASERS:
            return {
                ...state,
                teaserList: action.payload
            }
        default:
            return state
    }
}

