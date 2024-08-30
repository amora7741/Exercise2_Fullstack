'use client';

import { Credentials } from '@/lib/validation/credentials';
import AuthForm from './AuthForm';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthFormWrapper = ({ page }: { page: 'login' | 'signup' }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: Credentials) => {
    const { username, password } = data;

    if (page === 'signup') {
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
        const result = await signIn('credentials', {
          username,
          password,
          redirect: false,
        });

        if (!result?.ok) {
          throw new Error(result?.error || 'Failed to sign in');
        } else {
          router.replace('/home');
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error?.message || 'An unexpected error occurred.',
        });
      }
    }
  };

  return <AuthForm submitForm={handleSubmit} page={page} />;
};

export default AuthFormWrapper;
