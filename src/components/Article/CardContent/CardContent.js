import React from 'react';
import PropTypes from 'prop-types';
import classes from "./CardContent.module.css";

const cardContent = (props) => (
  <div className={classes.Card_content}>
    <h2 className={classes.Card_title}>
      {props.title}
    </h2>
    <p className={classes.Card_text}>
      {props.content}
    </p>
    {/*<button className="btn card_btn">Read More</button>*/}
  </div>
);

cardContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default cardContent;
