import * as ActionConstants from '../constants/ActionConstants';

var defaultState = {
    recommendationList: [],
    teaserList: [],
    profile: null,
    originalRecommendationList: [],
    likedList: [],
    superLikedUser: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_RECOMMENDATIONS:
            return {
                ...state,
                recommendationList: action.payload,
                originalRecommendationList: action.payload
            }
        case ActionConstants.FETCH_TEASERS:
            return {
                ...state,
                teaserList: action.payload
            }
        case ActionConstants.FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case ActionConstants.SWIPE_AND_NEXT:
            return {
                ...state,
                recommendationList: action.payload
            }
        case ActionConstants.ADD_TO_LIKED_LIST:
            return {
                ...state,
                likedList: state.likedList.concat([action.payload])
            }
        case ActionConstants.REMOVE_FROM_LIKED_LIST:
            return {
                ...state,
                likedList: action.payload
            }
        case ActionConstants.SWIPE_AND_RELOAD:
            return {
                recommendationList: action.payload.recommendationList,
                teaserList: action.payload.teaserList,
                profile: action.payload.profile,
                originalRecommendationList: action.payload.recommendationList,
                likedList: [],
                superLikedUser: null
            }
        default:
            return state
    }
}

