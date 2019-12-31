import axios from 'axios';
import * as TinderConstants from '../constants/TinderConstants';


export const fetchRecommendations = (xAuthToken) => {
    var recommendationsUrl = TinderConstants.BASE_URL + TinderConstants.RECOMMENDATIONS;

    let config = {
        headers: {
            "x-auth-token": xAuthToken,
        }
    }
    return axios.get(recommendationsUrl, config);
}

export const fetchTeasers = (xAuthToken) => {
    var teaserURL = TinderConstants.BASE_URL + TinderConstants.TEASER;
    let config = {
        headers: {
            "x-auth-token": xAuthToken,
        }
    }
    return axios.get(teaserURL, config);
}

export const fetchProfile = (xAuthToken) => {
    var profileURL = TinderConstants.BASE_URL + TinderConstants.PROFILE;
    let config = {
        headers: {
            "x-auth-token": xAuthToken,
        }
    }
    return axios.get(profileURL, config);
}

export const swipes = (dataList, xAuthToken) => {
    var swipesUrl = TinderConstants.BASE_URL + TinderConstants.SWIPES;
    let config = {
        headers: {
            "x-auth-token": xAuthToken,
        }
    }
    return axios.post(swipesUrl, dataList, config);
}

export const refreshData = (xAuthToken) => {
    var refreshUrl = TinderConstants.BASE_URL + TinderConstants.REFRESH;
    let config = {
        headers: {
            "x-auth-token": xAuthToken,
        }
    }
    return axios.get(refreshUrl, config);
}

export const sendVerificationCode = (phoneNumber) => {
    var loginUrl = TinderConstants.BASE_URL + TinderConstants.LOGIN;
    var requestBody = {
        phone_number: phoneNumber
    }
    return axios.post(loginUrl, requestBody);
}

export const getAuthToken = (requestBody) => {
    var validateUrl = TinderConstants.BASE_URL + TinderConstants.VALIDATE;
    return axios.post(validateUrl, requestBody);
}
