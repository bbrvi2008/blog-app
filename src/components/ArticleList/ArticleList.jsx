import React from 'react';
import PropTypes from 'prop-types';

import ArticleItem from '../ArticleItem';

import classes from './ArticleList.module.scss';

const ArticleList = ({ articles }) => {
  const elements = articles.map(article => {
    const { slug } = article;
    return (
      <li key={slug} className={classes.item} >
        <ArticleItem {...article} />
      </li>
    )
  });

  return (<ul className={classes.list} >{elements}</ul>)
}

ArticleList.defaultProps = {
  articles: []
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string
  }))
};

export default ArticleList;