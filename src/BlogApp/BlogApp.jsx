import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'helpers/PrivateRoute';
import cn from 'classnames';

import 'antd/dist/antd.css';
import 'library.blocks/ant-pagination.css';
import styles from './BlogApp.module.scss';

import Header from 'containers/Header';

import ArticlesPage from 'pages/ArticlesPage';
import ArticlePage from 'pages/ArticlePage';

import SignInForm from 'forms/SignInForm';
import SignUpForm from 'forms/SignUpForm';
import ProfileForm from 'forms/ProfileForm';

import NewArticleForm from 'forms/ArticleForm/NewArticleForm';
import EditArticleForm from 'forms/ArticleForm/EditArticleForm';

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