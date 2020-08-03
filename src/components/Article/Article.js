import React from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardContent from './CardContent/CardContent';
import classes from './Article.module.css';
import PropTypes from 'prop-types';

const article = (props) => (
  <div className={classes.Cards_item} onClick={() => {window.open(props.article.url, "_blank")}}>
    <div className={classes.Card}>
      <CardHeader
        publisher={props.article.source.name}
        publishTime={props.article.publishedAt}
      />
      <div className={classes.Card_image}>
        <img className={classes.img} src={props.article.urlToImage} alt={props.article.title} />
      </div>
      <CardContent
        title={props.article.title}
        content={props.article.description}
      />
    </div>
  </div>
);

article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
  }),
};

export default article;
