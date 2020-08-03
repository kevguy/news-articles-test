import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NewsResult from 'containers/NewsResult/NewsResult';

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders')
// });

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={NewsResult} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
