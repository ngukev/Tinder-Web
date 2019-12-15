import * as TinderConstants from '../constants/TinderConstants';
import axios from 'axios';

export const fetchRecommendations = () =>
{
    var recommendationsUrl = TinderConstants.BASE_URL + TinderConstants.RECOMMENDATIONS;
    return axios.get(recommendationsUrl);
}