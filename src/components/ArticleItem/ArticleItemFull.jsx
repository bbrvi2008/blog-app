import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';
import formatDate from 'date-fns/format';

import Tags from '../Tags';
import Author from '../Author';
import Like from '../Like';

import styles from './ArticleItem.module.scss';

const ArticleItemFull = ({ title, description, body, createdAt, tagList, favoritesCount, author, children }) => {
  return (<section className={styles.container} >
    <main className={styles.content} >
      <header className={cn(styles.header, styles.row)}>
        <h3 className={styles.title} >{title}</h3>
        <span className={cn(styles.date, styles.headerItem)} >{formatDate(new Date(createdAt), "MMMM d, yyyy")}</span>
        <Like count={favoritesCount} className={styles.headerItem} />
      </header>
      <Tags className={styles.row} values={tagList} />
      <p className={cn(styles.desctiptionFull, styles.row)} >{description}</p>
    </main>
    <aside className={styles.sidebar} >
      <Author {...author} />
      { children }
    </aside>
    <div className={styles.body} >
      <ReactMarkdown source={body} />
    </div>
  </section>);
}

ArticleItemFull.defaultProps = {
  title: '', 
  description: '', 
  body: '', 
  createdAt: '', 
  tagList: [], 
  favoritesCount: 0, 
  author: {}
};

ArticleItemFull.propTypes = {
  title: PropTypes.string, 
  description: PropTypes.string, 
  body: PropTypes.string, 
  createdAt: PropTypes.string, 
  tagList: PropTypes.array, 
  favoritesCount: PropTypes.number, 
  author: PropTypes.object
};

export default ArticleItemFull;