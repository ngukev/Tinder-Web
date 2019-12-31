import * as ActionConstants from '../constants/ActionConstants';
import * as TinderAPIService from '../services/TinderAPIService';
import * as TinderConstants from '../constants/TinderConstants';
import moment from 'moment';
export const fetchRecommendations = (xAuthToken) => {
    return dispatch => {

        TinderAPIService.fetchRecommendations(xAuthToken).then(response => {
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

export const fetchTeasers = (xAuthToken) => {
    return dispatch => {
        TinderAPIService.fetchTeasers(xAuthToken).then(response => {
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

export const fetchProfile = (xAuthToken) => {
    return dispatch => {
        TinderAPIService.fetchProfile(xAuthToken).then(response => {
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

export const swipeAndNext = (likedList, recommendationList,xAuthToken) => {
    return dispatch => {
        var momentTimeStamp = moment().unix();
        dispatch({
            type: ActionConstants.ADD_TO_DISPENSER,
            payload: momentTimeStamp
        })

        var newRecommendationList = [];
        if (recommendationList.length > TinderConstants.LIMIT) {
            for (var i = TinderConstants.LIMIT; i < recommendationList.length; i++) {
                newRecommendationList.push(recommendationList[i])
            }
        }
        var mySwipeDataList = getSwipeDataList(likedList, recommendationList);
        TinderAPIService.swipes(mySwipeDataList,xAuthToken).then(response => {
            var dataIsOkay = true;
            var data = response.data.responseList;
            data.forEach(responseString => {
                if (!responseString.includes('"status":200') &&
                    !responseString.includes('*code*:200')) {
                    dataIsOkay = false;
                    return;
                }
            });
            if (dataIsOkay) {
                dispatch({
                    type: ActionConstants.SWIPE,
                    payload: newRecommendationList
                })
                dispatch({
                    type: ActionConstants.DELETE_FROM_DISPENSER,
                    payload: momentTimeStamp
                })
            }

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

export const removeFromLikedList = (user, likedList) => {
    let filteredArray = likedList.filter(likedUser => likedUser.user._id !== user.user._id);
    return dispatch => {
        dispatch({
            type: ActionConstants.REMOVE_FROM_LIKED_LIST,
            payload: filteredArray
        })
    }
}

function getSwipeDataList(likedList, recommendationList) {
    var mySwipeDataList = [];
    var size = recommendationList.length > 8 ? 8 : recommendationList.length;
    for(var i = 0; i < size; i++)
    {
        var found = false;
        var user = recommendationList[i];
        for (var j = 0; j < likedList.length; j++) {
            if (user.user._id === likedList[j].user._id) {
                found = true;
                break;
            }
        }
        var mySwipeData = {
            liked: found,
            userID: user.user._id,
            sNumber: user.s_number.toString()
        }

        mySwipeDataList.push(mySwipeData);
    }
    return mySwipeDataList;
}



export const swipeAndReload = (likedList, recommendationList,xAuthToken) => {
    return dispatch => {
        var momentTimeStamp = moment().unix();
        dispatch({
            type: ActionConstants.ADD_TO_DISPENSER,
            payload: momentTimeStamp
        })

        var mySwipeDataList = getSwipeDataList(likedList, recommendationList);
        TinderAPIService.swipes(mySwipeDataList,xAuthToken).then(response => {
            var dataIsOkay = true;
            var data = response.data.responseList;
            data.forEach(responseString => {
                if (!responseString.includes('"status":200') &&
                    !responseString.includes('*code*:200')) {
                    dataIsOkay = false;
                    return;
                }
            });
            if (dataIsOkay) {
                TinderAPIService.refreshData(xAuthToken).then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: ActionConstants.SWIPE_AND_RELOAD,
                            payload: response.data
                        })

                        dispatch({
                            type: ActionConstants.DELETE_FROM_DISPENSER,
                            payload: momentTimeStamp
                        })
                    }
                })
            }
        })
    }
}

export const getAuthToken = (requestBody) => {
    return dispatch => {
        TinderAPIService.getAuthToken(requestBody).then(response => {
            if(response.data.meta.status === 200)
            {
                var apiToken = response.data.data.api_token;
                sessionStorage.setItem("x-auth-token",apiToken);
                dispatch({
                    type : ActionConstants.GET_AUTH_TOKEN,
                    payload: apiToken
                })
            }
        })
    }
}

export const getCachedAuthToken = () => {
    return dispatch => {
        var authToken = sessionStorage.getItem("x-auth-token");
        if(true)
        {
            dispatch({
                type : ActionConstants.GET_CACHE_AUTH_TOKEN,
                payload: authToken
            })
        }
    }
}