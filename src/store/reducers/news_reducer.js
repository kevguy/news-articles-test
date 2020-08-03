import * as actionTypes from 'store/actions/actionTypes';
import { updateObject } from '../utility.js';
import Fuse from 'fuse.js'

const initialState = {
  fetchedData: [],
  totalPages: 0,
  isFetching: false,
  fetchLimit: 100,
  pageLimit: 10,
  error: false,

  fuse: undefined,

  srchKey: '',
  filteredResult: [],
};

// For Fuse.js
const srchOptions = {
  shouldSort: true,
  includeScore: true,
  // includeMatches: true,
  tokenize: true,
  findAllMatches: true,
  matchAllTokens: true,
  threshold: 0.0,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title', 'description'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_DATA_START:
      return updateObject(state, {
        isFetching: true,
      });
    case actionTypes.FETCH_NEWS_DATA_SUCCESS:
      const fuse = new Fuse(action.newsData, srchOptions);
      return updateObject(state, {
        fetchedData: action.newsData,
        filteredResult: action.newsData,
        isFetching: false,
        fuse,
        totalPages: Math.floor(action.newsData.length / state.pageLimit) +
          ((action.newsData.length % state.pageLimit) > 0),
      });
    case actionTypes.FETCH_NEWS_DATA_FAILED:
      return updateObject(state, {
        error: true,
        isFetching: false,
      });
    case actionTypes.UPDATE_SRCH_KEYWORD:
      // When there're data and keyword is not empty
      if (action.keyword.length > 0 && state.fuse && state.fetchedData.length > 0) {
        const filteredResult = state.fuse.search(action.keyword)
          .map(data => data.item);
        const newSubState = {
          srchKey: action.keyword,
          filteredResult,
          totalPages: Math.floor(filteredResult.length / state.pageLimit) +
            ((filteredResult.length % state.pageLimit) > 0),
        };
        return updateObject(state, {
          ...newSubState,
        });
      }
      if (action.keyword.length === 0) {
        return updateObject(state, {
          filteredResult: state.fetchedData,
          totalPages: Math.floor(state.fetchedData.length / state.pageLimit) +
            ((state.fetchedData.length % state.pageLimit) > 0),
        });
      }
      return updateObject(state, {
        srchKey: action.keyword,
      });
    default:
      return state;
  }
}

export default reducer;
