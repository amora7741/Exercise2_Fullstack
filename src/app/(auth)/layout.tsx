const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen flex items-center justify-center'>
      <div className='flex items-center p-8 h-screen w-full lg:w-1/3 lg:h-fit rounded-lg bg-blue-400'>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
