import * as ActionConstants from '../constants/ActionConstants';

var defaultState = {
    recommendationList: [],
    teaserList: [],
    profile : null
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
        case ActionConstants.FETCH_PROFILE:
            return{
                ...state,
                profile: action.payload
            }
        case ActionConstants.SWIPE_AND_NEXT:
            return {
                ...state,
                recommendationList: action.payload
            }
        default:
            return state
    }
}

