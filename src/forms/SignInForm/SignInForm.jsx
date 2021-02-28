import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Form, Input, Button, Typography, Spin } from 'antd';

import styles from './SignInForm.module.scss';

import { authenticationUser, resetUserStore } from 'reducers/user';
import { selectLoading, selectHasError, selectIsAuthenticated } from 'selectors/user';

const { Text } = Typography;

const SignInForm = ({ authenticationUser, resetUserStore, location }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    resetUserStore();
  }, [resetUserStore]);

  const handleSubmit = (user) => {
    authenticationUser(user);
  }

  if(!loading && isAuthenticated) {
    const { state } = location;
    if(state?.from) {
      const { pathname } = state.from;

      return (
        <Redirect to={ pathname } />
      )
    }

    return (
      <Redirect to="/" />
    )
  }

  const errorElement = hasError
    ? (
      <Form.Item className={styles.error} >
        <Text type="danger" >Email or password is invalid</Text>
      </Form.Item>
    )
    : null;

  return (
    <Form layout="vertical" className={styles.container} onFinish={handleSubmit} >
      <Spin spinning={loading} >
        <Typography.Title level={4} className={styles.title} >Sign In</Typography.Title>
        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: 'Email cannot be empty' },
            { type: 'email', message: 'The input is not valid E-mail!' }
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password cannot be empty' },
            { min: 8, message: 'Username min length 8 characters' },
            { max: 40, message: 'Username max length 40 characters' }
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {errorElement}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.buttonSubmit} >
            Login
        </Button>
        </Form.Item>
        <footer className={styles.footer} >
          <Text type="secondary" >Don’t have an account? <RouterLink to="/sign-up" >Sign Up</RouterLink>.</Text>
        </footer>
      </Spin>
    </Form>
  );
};

const mapDispatchToProps = {
  authenticationUser,
  resetUserStore
};

export default connect(null, mapDispatchToProps)(SignInForm);