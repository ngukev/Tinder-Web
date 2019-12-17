import * as TinderAPIService from '../services/TinderAPIService';
import * as ActionConstants from '../constants/ActionConstants';

export const fetchRecommendations = () => {
    return dispatch => {
        TinderAPIService.fetchRecommendations().then(response => {
            if (response != null && response.data.meta.status === 200) {
                var data = response.data.data.results;
                dispatch({
                    type: ActionConstants.FETCH_RECOMMENDATIONS,
                    payload: data
                })
            }
        })
    }
}

export const fetchTeasers = () => {
    return dispatch => {
        TinderAPIService.fetchTeasers().then(response => {
            if (response != null && response.data.meta.status === 200) {
                var data = response.data.data.results;
                dispatch({
                    type: ActionConstants.FETCH_TEASERS,
                    payload: data
                })
            }
        })
    }
}

export const fetchProfile = () => {
    return dispatch => {
        TinderAPIService.fetchProfile().then(response => {
            if (response != null && response.data.meta.status === 200) {
                var data = response.data.data;
                dispatch({
                    type: ActionConstants.FETCH_PROFILE,
                    payload: data
                })
            }
        })
    }
}

export const swipeAndNext = (recommendationList) => {
    return dispatch => {
        var data = [];
        if(recommendationList.length > 8)
        {
            for(var i = 8; i < recommendationList.length; i++)
            {
                data.push(recommendationList[i])
            }
        }
        dispatch({
            type: ActionConstants.SWIPE_AND_NEXT,
            payload: data
        })
    }
}
