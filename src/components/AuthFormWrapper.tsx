'use client';

import { Credentials } from '@/lib/validation/credentials';
import AuthForm from './AuthForm';
import axios from 'axios';

const AuthFormWrapper = ({ page }: { page: 'login' | 'register' }) => {
  const handleSubmit = async (data: Credentials) => {
    const { username, password } = data;

    if (page === 'register') {
      console.log('Registering');
    } else {
      console.log('Logging in');
    }
  };

  return <AuthForm submitForm={handleSubmit} />;
};

export default AuthFormWrapper;
