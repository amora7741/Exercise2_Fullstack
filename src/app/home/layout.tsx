import Link from 'next/link';
import { ListTodo } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div className='min-h-screen w-full grid grid-cols-[auto_1fr]'>
      <div className='px-8 py-6 bg-blue-300 flex-shrink-0'>
        <Link href='/home' className='flex items-center gap-2'>
          <ListTodo size={40} />
          <h1 className='text-3xl font-bold'>TaskMaster</h1>
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
