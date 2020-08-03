import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.ToolBar}>
    <div className={classes.Title}>US News</div>
    <nav>
      <div className={classes.SearchBar}>
        <input
          placeholder="&#xf002; Search"
          type="text"
          onChange={(evt) => { props.change(evt.target.value) }}
        />
      </div>
    </nav>
  </header>
);

export default toolbar;
