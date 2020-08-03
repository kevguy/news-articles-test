import React from 'react';
import Avatar from './Avatar/Avatar';
import PropTypes from 'prop-types';
import classes from "./CardHeader.module.css";
import {format} from 'date-fns';

const cardContent = (props) => {
  return (
    <div className={classes.Card_header}>
      <Avatar list={[props.publisher]}/>
      <div className={classes.Header_content}>
        <div className={classes.Header_title}>
          {props.publisher}
        </div>
        <div className={classes.Header_subtitle}>
          {format(new Date(props.publishTime), 'yyyy-MM-dd hh:mm')}
        </div>
      </div>
    </div>
  );
};

cardContent.propTypes = {
  publisher: PropTypes.string.isRequired,
  publishTime: PropTypes.string.isRequired
};

export default cardContent;
