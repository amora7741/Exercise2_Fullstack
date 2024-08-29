'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { credentialsSchema, Credentials } from '@/lib/validation/credentials';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

const AuthForm = ({
  submitForm,
}: {
  submitForm: (data: Credentials) => void;
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
    <form className='space-y-12' onSubmit={handleSubmit(submitForm)}>
      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='username'>Username</label>
        <input
          {...register('username')}
          placeholder='Username'
          className='p-2 rounded-md'
          id='username'
        />
        {errors.username && (
          <p className='absolute -bottom-6 right-0 text-red-700'>
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
          <p className='absolute -bottom-6 right-0 text-red-700'>
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        className='flex items-center justify-center bg-blue-500 w-full p-4 rounded-lg font-bold text-white hover:bg-blue-700'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <p>Submit</p>
        )}
      </button>
    </form>
  );
};

export default AuthForm;
