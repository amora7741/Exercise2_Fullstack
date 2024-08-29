import AuthFormWrapper from '@/components/AuthFormWrapper';

const LoginPage = () => {
  return (
    <div className='w-full'>
      <h1 className='font-bold text-4xl mb-8'>Login</h1>
      <AuthFormWrapper page='login' />
    </div>
  );
};

export default LoginPage;
