'use client';

import { Credentials } from '@/lib/validation/credentials';
import AuthForm from './AuthForm';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';

const AuthFormWrapper = ({ page }: { page: 'login' | 'register' }) => {
  const { toast } = useToast();

  const handleSubmit = async (data: Credentials) => {
    const { username, password } = data;

    if (page === 'register') {
      try {
        await axios.post('/api/auth/register', { username, password });
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'You sucessfully registered.',
        });
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.response?.data?.error || 'Something went wrong!',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'An unexpected error occurred.',
          });
        }
      }
    } else {
      try {
        await signIn('credentials', { username, password });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred.',
        });
      }
    }
  };

  return <AuthForm submitForm={handleSubmit} />;
};

export default AuthFormWrapper;
