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
