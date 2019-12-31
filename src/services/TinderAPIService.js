import axios from 'axios';
import * as TinderConstants from '../constants/TinderConstants';


export const fetchRecommendations = (xAuthToken) => {
    var recommendationsUrl = TinderConstants.BASE_URL + TinderConstants.RECOMMENDATIONS;
    var header = {
        "x-auth-token" : xAuthToken
    }
    return axios.get(recommendationsUrl,header);
}

export const fetchTeasers = (xAuthToken) => {
    var teaserURL = TinderConstants.BASE_URL + TinderConstants.TEASER;
    var header = {
        "x-auth-token" : xAuthToken
    }
    return axios.get(teaserURL,header);
}

export const fetchProfile = (xAuthToken) => {
    var profileURL = TinderConstants.BASE_URL + TinderConstants.PROFILE;
    var header = {
        "x-auth-token" : xAuthToken
    }
    return axios.get(profileURL,header);
}

export const swipes = (dataList,xAuthToken) => {
    var swipesUrl = TinderConstants.BASE_URL + TinderConstants.SWIPES;
    var header = {
        "x-auth-token" : xAuthToken
    }
    return axios.post(swipesUrl, dataList,header);
}

export const refreshData = (xAuthToken) => {
    var refreshUrl = TinderConstants.BASE_URL + TinderConstants.REFRESH;
    var header = {
        "x-auth-token" : xAuthToken
    }
    return axios.get(refreshUrl,header);
}

export const sendVerificationCode = (phoneNumber) => {
    var loginUrl = TinderConstants.BASE_URL + TinderConstants.LOGIN;
    var requestBody = {
        phone_number : phoneNumber
    }
    return axios.post(loginUrl,requestBody);
}

export const getAuthToken = (requestBody) => {
    var validateUrl = TinderConstants.BASE_URL + TinderConstants.VALIDATE;
    return axios.post(validateUrl,requestBody);
}
