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
    var finalData = {};
    fetchRecommendations().then(recommendationResponse => {
        var recommendationList = [];
        if (recommendationResponse.status === 200) {
            recommendationList = recommendationResponse.data.data.results;
        }
        finalData.recommendationList = recommendationList;
        fetchTeasers().then(teaserResponse => {
            var teaserList = [];
            if (teaserResponse.status === 200) {
                teaserList = teaserResponse.data.data.results;
            }
            finalData.teaserList = teaserList;
            fetchProfile().then(profileResponse => {
                var profileData = null;
                if (profileResponse.status === 200) {
                    var profileData = profileResponse.data;
                }
                finalData.profileData = profileData;
            })
        })
    })
    return finalData;
}
