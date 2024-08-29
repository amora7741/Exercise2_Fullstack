import AuthFormWrapper from '@/components/AuthFormWrapper';

const RegisterPage = () => {
  return (
    <div className='w-full'>
      <h1 className='font-bold text-4xl mb-8'>Register</h1>
      <AuthFormWrapper page='register' />
    </div>
  );
};

export default RegisterPage;
