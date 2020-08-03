import React, {Component} from 'react';
import { connect } from 'react-redux';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import * as actions from 'store/actions/index';
import axios from '../../axios-news';
import Article from 'components/Article/Article';
import Spinner from 'components/UI/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import classes from './NewsResult.module.css';

export class NewsResult extends Component {
  constructor(props) {
    super(props);
    this.scroll = React.createRef();
  }
  state = {
    selection: [],
    pageNo: 0,
  }

  componentDidMount() {
    this.props.onFetchNewsData();
  }

  componentWillReceiveProps(nextProps) {
    // Check if srch key has changed, if yes, reset everything and restart pagination
    if (nextProps.srchKey !== this.props.srchKey) {
      this.setState({
        selection: [],
        pageNo: 0,
      });
      // Force restart pagination for infinite scroller
      // https://github.com/danbovey/react-infinite-scroller/issues/12#issuecomment-302678837
      if (this.scroll) {
        this.scroll.pageLoaded = 0;
      }
    }
  }

  loadMoreDataHandler = (requestedPageNo) => {
    if (requestedPageNo > this.props.totalPages) {
      // Already showing all the filtered results
      return
    }
    if (requestedPageNo === this.props.totalPages) {
      // Requesting last page, i.e. show everything
      this.setState({
        selection: this.props.filteredResult,
        pageNo: requestedPageNo,
      });
      return
    }
    // Do shallow copy of the first n elements of interest
    // depending on requested page no
    this.setState({
      selection: this.props.filteredResult.slice(0, requestedPageNo * this.props.pageLimit),
      pageNo: requestedPageNo,
    });
  }

  render() {
    if (this.props.error) {
      return (
        <p className={classes.Message}>News Articles Didn't Load</p>
      )
    }
    // Note that this.props.filteredResult is always an array
    // and is never null nor undefined
    let articles = <Spinner />;
    if (this.props.filteredResult.length > 0) {
      // Filtered results are available and not empty
      // The key prop is due to infinite scroller
      // https://github.com/danbovey/react-infinite-scroller/pull/127#issuecomment-357910337
      const loader = <Spinner key={-1} />;
      const items = this.state.selection.map((article, idx) => (
        <Article article={article} key={`${idx}-${article.publishedAt}`} />
      ));
      articles = <InfiniteScroll
          // ref={this.scroll}
          ref={(scroll) => { this.scroll = scroll; }}
          pageStart={0}
          loadMore={this.loadMoreDataHandler}
          hasMore={this.state.pageNo < this.props.totalPages}
          loader={loader}
          className={classes.Cards}>
        {items}
        </InfiniteScroll>;
    } else if (!this.props.loading) {
      // Filtered results are available but empty
      articles = <p className={classes.Message}>News Articles Not Found</p>;
    }
    return (articles);
  }
}

const mapStateToProps = state => {
  return {
    fetchedData: state.news.fetchedData,
    loading: state.news.isFetching,
    error: state.news.error,
    srchKey: state.news.srchKey,
    filteredResult: state.news.filteredResult,
    totalPages: state.news.totalPages,
    pageLimit: state.news.pageLimit,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchNewsData: () => dispatch(actions.initNewsData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewsResult, axios));
