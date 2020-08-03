import React from 'react';
import classes from "./Avatar.module.css";

const avatar = (props) => {
  const list = props.list.map(item => <span key={item}>{item}</span>);

  return (
    <div className={classes.Avatar}>
      <div className={classes.ia}>
        {list}
      </div>
    </div>
  );
};

export default avatar;
