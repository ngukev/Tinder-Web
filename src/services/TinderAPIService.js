import axios from 'axios';
import * as TinderConstants from '../constants/TinderConstants';

export const fetchRecommendations = () => {
    var recommendationsUrl = TinderConstants.BASE_URL + TinderConstants.RECOMMENDATIONS;
    return axios.get(recommendationsUrl);
}

export const fetchTeasers = () => {
    var teaserURL = TinderConstants.BASE_URL + TinderConstants.TEASER;
    return axios.get(teaserURL);
}

export const fetchProfile = () => {
    var profileURL = TinderConstants.BASE_URL + TinderConstants.PROFILE;
    return axios.get(profileURL);
}

export const swipes = (dataList) => {
    var swipesUrl = TinderConstants.BASE_URL + TinderConstants.SWIPES;
    return axios.post(swipesUrl, dataList);
}

export const refreshData = () => {
    var refreshUrl = TinderConstants.BASE_URL + TinderConstants.REFRESH;
    return axios.get(refreshUrl);
}

export const sendVerificationCode = (phoneNumber) => {
    var loginUrl = TinderConstants.BASE_URL + TinderConstants.LOGIN;
    var requestBody = {
        phone_number : phoneNumber
    }
    return axios.post(loginUrl,requestBody);
}
