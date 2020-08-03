import reducer from './news_reducer';
import * as actionTypes from '../actions/actionTypes';
import sampleData from './sample_data.json';

describe('newsReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      fetchedData: [],
      totalPages: 0,
      isFetching: false,
      fetchLimit: 100,
      pageLimit: 10,
      error: false,

      fuse: undefined,

      srchKey: '',
      filteredResult: [],
    });
  });

  it(`should show it's fetching when starting to fetch data`, () => {
    const state = reducer(undefined, {
      type: actionTypes.FETCH_NEWS_DATA_START,
    });
    expect(state.isFetching).toEqual(true);
  });

  it('should store fetched results', () => {
    const state = reducer(undefined, {
      type: actionTypes.FETCH_NEWS_DATA_SUCCESS,
      newsData: sampleData.articles,
    });
    expect(state.isFetching).toEqual(false);
    expect(state.fetchedData.length).toEqual(sampleData.articles.length);
    expect(state.filteredResult.length).toEqual(sampleData.articles.length);
  });

  it('should be able to get search results', () => {
    const state = reducer(undefined, {
      type: actionTypes.FETCH_NEWS_DATA_SUCCESS,
      newsData: sampleData.articles,
    });
    const newState = reducer(state, {
      type: actionTypes.UPDATE_SRCH_KEYWORD,
      keyword: 'this',
    });
    expect(state.filteredResult.length).toBeGreaterThan(0);
    expect(state.filteredResult.length).toBeLessThanOrEqual(state.fetchedData.length);
  });
});
