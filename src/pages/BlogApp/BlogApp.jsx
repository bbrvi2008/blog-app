import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../helpers/PrivateRoute';
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

import NewArticleForm from '../../forms/NewArticleForm';
import EditArticleForm from '../../forms/EditArticleForm';

const BlogApp = () => {
  return (
    <BrowserRouter>
      <Header className={styles.contentWrapper} />
      <div className={styles.container} >
        <main className={cn(styles.content, styles.contentWrapper)}>
          <Switch>
            <Route path="/" exact component={ArticlesPage} />
            <Route path="/articles" exact component={ArticlesPage} />
            <Route path="/articles/:slug" exact component={ArticlePage} />
            <PrivateRoute path="/articles/:slug/edit" component={EditArticleForm} />
            <Route path="/sign-in" component={SignInForm} />
            <Route path="/sign-up" component={SignUpForm} />
            <PrivateRoute path="/profile" component={ProfileForm} />
            <PrivateRoute path="/new-article" component={NewArticleForm} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default BlogApp;