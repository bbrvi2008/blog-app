import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import formatDate from 'date-fns/format';

import Tags from '../Tags';
import Author from '../Author';
import Like from '../Like';

import styles from './ArticleItem.module.scss';

const ArticleItemShort = ({ slug, title, description, createdAt, tagList, favoritesCount, author }) => {

  return (<section className={styles.container} >
    <main className={styles.content} >
      <header className={cn(styles.header, styles.row)}>
        <Link to={`/articles/${slug}`} ><h3 className={styles.title} >{title}</h3></Link>
        <span className={cn(styles.date, styles.headerItem)} >{formatDate(new Date(createdAt), "MMMM d, yyyy")}</span>
        <Like count={favoritesCount} className={styles.headerItem} />
      </header>
      <Tags className={styles.row} values={tagList} />
      <p className={cn(styles.desctiption, styles.row)} >{description}</p>
    </main>
    <aside className={styles.sidebar} >
      <Author {...author} />
    </aside>
  </section>);
}

ArticleItemShort.defaultProps = {
  title: '', 
  description: '', 
  createdAt: '', 
  tagList: [], 
  favoritesCount: 0, 
  author: {}
};

ArticleItemShort.propTypes = {
  title: PropTypes.string, 
  description: PropTypes.string, 
  createdAt: PropTypes.string, 
  tagList: PropTypes.array, 
  favoritesCount: PropTypes.number, 
  author: PropTypes.object
};

export default ArticleItemShort;