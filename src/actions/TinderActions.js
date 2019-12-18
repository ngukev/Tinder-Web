import * as TinderAPIService from '../services/TinderAPIService';
import * as ActionConstants from '../constants/ActionConstants';
import store from '../store';

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
            if (response != null) {
                var data = response.data;
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

export const addToLikedList = (user) => {
    return dispatch => {
        dispatch({
            type: ActionConstants.ADD_TO_LIKED_LIST,
            payload: user
        })
    }
}

export const removeFromLikedList = (user,likedList) => {
    let filteredArray = likedList.filter(likedUser => likedUser.user._id !== user.user._id);
    return dispatch => {
        dispatch({
            type: ActionConstants.REMOVE_FROM_LIKED_LIST,
            payload: filteredArray
        })
    }
}

export const swipeAndReload = (likedList,recommendationList) =>
{
    return dispatch => {
        var mySwipeDataList = [];

        recommendationList.forEach(user => {
            var found = false;
            for(var i = 0; i < likedList.length; i++)
            {
                if(user.user._id === likedList[i].user._id)
                {
                    found = true;
                    break;
                }
            }
            var mySwipeData = {
                liked : found,
                userID : user.user._id,
                sNumber : user.s_number.toString()
            }

            mySwipeDataList.push(mySwipeData);
        });
        TinderAPIService.swipes(mySwipeDataList).then(response => {
            var dataIsOkay = true;
            var data = response.data.responseList;
            data.forEach(responseString => {
                if (!responseString.includes('"status":200') &&
                    !responseString.includes('*code*:200'))
                {
                    dataIsOkay = false;
                    return;
                }
            });
            if(dataIsOkay)
            {
                TinderAPIService.refreshData().then(response => {
                    console.log(response);
                    if(response.status === 200)
                    {
                        dispatch({
                            type : ActionConstants.SWIPE_AND_RELOAD,
                            payload : response.data
                        })
                    }
                })
            }
        })
    }
}