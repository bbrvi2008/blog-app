import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, Spin } from 'antd';

import styles from './ProfileForm.module.scss';

import { updateUser } from 'reducers/user';
import { selectIsAuthenticated, selectLoading, selectUser } from 'selectors/user';

const ProfileForm = ({ updateUser }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  
  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  const handleSubmit = (data) => {
    updateUser({
      ...user,
      ...data
    });
  }

  const { username, email, image } = user;
  return (
    <Form
      layout="vertical"
      className={styles.container}
      onFinish={handleSubmit}
      initialValues={{
        username,
        email,
        image
      }}
    >
      <Spin spinning={loading} >
        <Typography.Title level={4} className={styles.title} >Edit Profile</Typography.Title>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username cannot be empty' }]} >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" label="Email address" rules={[
          { required: true, message: 'E-mail cannot be empty' },
          { type: 'email', message: 'The input is not valid E-mail!' }
        ]} >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[
          { min: 8, message: 'Username min length 8 characters' },
          { max: 40, message: 'Username max length 40 characters' }
        ]} >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="image" label="Avatar image (url)" rules={[
          { type: 'url', message: 'Should valid url' }
        ]} >
          <Input placeholder="Avatar image" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.buttonSubmit} >
            Save
        </Button>
        </Form.Item>
      </Spin>
    </Form>
  )
};

const mapDispatchToProps = {
  updateUser
};

export default connect(null, mapDispatchToProps)(ProfileForm);