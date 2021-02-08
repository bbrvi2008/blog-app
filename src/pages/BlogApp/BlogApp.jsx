import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import cn from 'classnames';

import 'antd/dist/antd.css';
import '../../library.blocks/ant-pagination.css';
import styles from './BlogApp.module.scss';

import Header from '../../containers/Header';

import ArticlesPage from '../ArticlesPage';
import ArticlePage from '../ArticlePage';

import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import ProfileForm from '../ProfileForm';

const BlogApp = () => {
  return (
    <BrowserRouter>
      <Header className={styles.contentWrapper} />
      <div className={styles.container} >
        <main className={cn(styles.content, styles.contentWrapper)}>
          <Route path="/" exact component={ArticlesPage} />
          <Route path="/articles" exact component={ArticlesPage} />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route path="/sign-in" component={SignInForm} />
          <Route path="/sign-up" component={SignUpForm} />
          <Route path="/profile" component={ProfileForm} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default BlogApp;