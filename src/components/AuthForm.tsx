'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { credentialsSchema, Credentials } from '@/lib/validation/credentials';
import { BookCheck, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

const AuthForm = ({
  submitForm,
  page,
}: {
  submitForm: (data: Credentials) => void;
  page: 'login' | 'signup';
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className='flex flex-col space-y-12'
      onSubmit={handleSubmit(submitForm)}
    >
      <div className='flex items-center gap-2 self-center'>
        <BookCheck size={40} fill='white' />
        <h1 className='text-4xl font-bold text-white'>TaskMaster</h1>
      </div>
      <h1 className='text-white font-semibold text-2xl'>
        {page === 'login' ? 'Login' : 'Sign Up'}
      </h1>
      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='username'>Username</label>
        <input
          {...register('username')}
          placeholder='Username'
          className='p-2 rounded-md'
          id='username'
        />
        {errors.username && (
          <p className='absolute -bottom-6 right-0 text-red-900 font-semibold'>
            {errors.username.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='password'>Password</label>
        <input
          {...register('password')}
          type='password'
          placeholder='Password'
          className='p-2 rounded-md'
          id='password'
        />
        {errors.password && (
          <p className='absolute -bottom-6 right-0 text-red-900 font-semibold'>
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        className='flex items-center justify-center bg-blue-600 w-full p-4 rounded-lg font-bold text-white hover:bg-blue-700'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <p>{page === 'login' ? 'Login' : 'Sign Up'}</p>
        )}
      </button>
      {page === 'login' ? (
        <p className='self-end text-white'>
          Don&apos;t have an account?{' '}
          <Link
            className='text-blue-800 hover:underline font-semibold'
            href='/signup'
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p className='self-end text-white'>
          Already have an account?{' '}
          <Link
            className='text-blue-800 hover:underline font-semibold'
            href='/login'
          >
            Login
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
