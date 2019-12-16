import axios from 'axios';
import * as TinderConstants from '../constants/TinderConstants';

export const fetchRecommendations = () =>
{
    var recommendationsUrl = TinderConstants.BASE_URL + TinderConstants.RECOMMENDATIONS;
    return axios.get(recommendationsUrl);
}

export const fetchTeasers = () =>
{
    var teaserURL = TinderConstants.BASE_URL + TinderConstants.TEASER;
    return axios.get(teaserURL);
}