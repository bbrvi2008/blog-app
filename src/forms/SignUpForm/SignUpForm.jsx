import React, { useEffect }  from 'react';
import { connect, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Form, Input, Button, Typography, Divider, Checkbox, Spin } from 'antd';

import styles from './SignUpForm.module.scss';

import { registrationUser, resetUserStore } from 'reducers/user';
import { selectIsAuthenticated, selectLoading, selectCompleted, selectHasError, selectError } from 'selectors/user';

const { Text } = Typography;

const SignUpForm = ({ registrationUser, resetUserStore }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const completed = useSelector(selectCompleted);
  const hasError = useSelector(selectHasError);
  const error = useSelector(selectError);

  useEffect(() => {
    resetUserStore();
  }, [resetUserStore])

  const handleSubmit = ({ username, email, password }) => {
    registrationUser({
      username,
      email,
      password
    });
  }

  if(completed || isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Spin spinning={loading} >
      <Form layout="vertical" className={styles.container} onFinish={handleSubmit} >
        <Typography.Title level={4} className={styles.title} >Sign Up</Typography.Title>
        <Form.Item
          name="username" 
          label="Username"
          validateStatus={hasError && Boolean(error['username']) ? 'error' : null}
          help={hasError && Boolean(error['username']) ? error['username'] : null} 
          rules={[
            { required: true, message: 'Username cannot be empty' },
            { min: 3, message: 'Username min length 3 characters' },
            { max: 20, message: 'Username max length 20 characters' }
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email" 
          label="E-mail address"
          validateStatus={hasError && Boolean(error['email']) ? 'error' : null}
          help={hasError && Boolean(error['email']) ? error['email'] : null}
          rules={[
            { required: true, message: 'E-mail cannot be empty' },
            { type: 'email', message: 'The input is not valid E-mail!' }
          ]} 
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[
          { required: true, message: 'Password cannot be empty' },
          { min: 8, message: 'Username min length 8 characters' },
          { max: 40, message: 'Username max length 40 characters' }
        ]} >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="repeatpassword" label="Repeat password" dependencies={['password']} rules={[
          { required: true, message: 'Repeat password cannot be empty' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          })
        ]} >
          <Input.Password placeholder="Repeat Password" />
        </Form.Item>
        <Divider />
        <Form.Item name="agree" valuePropName="checked" rules={[
          {
            validator: (_, value) => {
              return value ? Promise.resolve() : Promise.reject('Should accept agreement')
            }
          }
        ]} >
          <Checkbox>
            <Text type="secondary" >I agree to the processing of my personal information</Text>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.buttonSubmit} >
            Create
        </Button>
        </Form.Item>
        <footer className={styles.footer} >
          <Text type="secondary"  >Already have an account? <RouterLink to="/sign-in" >Sign In</RouterLink>.</Text>
        </footer>
      </Form>
    </Spin>
  )
};

const mapDispatchToProps = {
  registrationUser,
  resetUserStore
};

export default  connect(null, mapDispatchToProps)(SignUpForm);