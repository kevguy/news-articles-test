import React from 'react';
import { connect } from 'react-redux';
import Aux from 'hoc/Aux/Aux';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import * as actions from "store/actions";

class Layout extends React.Component {
  render(){
    return(
      <Aux>
        <ToolBar change={this.props.onChangeSrchKeyword} />
        <main className={classes.Content}>
        {/* renders the component we wrap with this layout */}
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeSrchKeyword: (keyword) => dispatch(actions.changeSrchKeyword(keyword)),
  };
}

export default connect(null, mapDispatchToProps)(Layout);
