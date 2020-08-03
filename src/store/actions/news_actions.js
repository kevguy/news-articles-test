import * as actionTypes from './actionTypes';
import {constructParamString} from "shared/utility";
import axios from 'axios-news';
import {format, subDays} from 'date-fns';

// Query Options for News API
const queryOptions = {
  apiKey: process.env.REACT_APP_NEWS_API_KEY,
  sources: 'the-washington-post,the-new-york-times',
  from: format(subDays(new Date(), 30), 'yyyy-MM-dd hh:mm'),
  to: format(new Date(), 'yyyy-MM-dd hh:mm'),
  sortBy: 'popularity', // relevancy, publishedAt
  pageSize: 100,
  // page: typeof news.newsList === 'undefined' ? 1 : (news.newsList.length / news.pageSize) + 1,
  page: 1,
}
const paramStr = constructParamString(queryOptions);

/**
 * setNewsData is an action creator for when news data is fetched
 * @param {object[]} newsData
 * @returns {{newsData: object[], type: string}} the action
 */
export const setNewsData = (newsData) => {
  return {
    type: actionTypes.FETCH_NEWS_DATA_SUCCESS,
    newsData,
  };
}

/**
 * fetchNewsDataFailed is an action creator for when it's failing
 * to fetch news data
 * @param error error
 * @returns {{type: string, error: error}} the action
 */
export const fetchNewsDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_DATA_FAILED,
    error,
  };
}

/**
 * fetchNewsDataStart is an action creator for when it's starting to
 * fetch news articles from the API
 * @returns {{type: string}} the action
 */
export const fetchNewsDataStart = () => {
  return {
    type: actionTypes.FETCH_NEWS_DATA_START,
  };
}

export const initNewsData = () => {
  return async dispatch => {
    try {
      dispatch(fetchNewsDataStart());
      const res = await axios.get(`everything?${paramStr}`);
      if (res.data.status !== 'ok') {
        throw new Error('Data Error');
      }
      dispatch(setNewsData(res.data.articles));
    } catch (e) {
      console.log(e);
      dispatch(fetchNewsDataFailed(e))
    }
  }
}

/**
 * changeSrchKeyword is an action creator when
 * search input is updated
 * @param {string} keyword
 * @returns {{type: string, keyword: string}} the action
 */
export const changeSrchKeyword = (keyword) => {
  return {
    type: actionTypes.UPDATE_SRCH_KEYWORD,
    keyword,
  }
}
