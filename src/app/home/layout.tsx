import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BookCheck } from 'lucide-react';
import LogoutPopover from '@/components/LogoutPopover';
import { notFound } from 'next/navigation';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  return (
    <div className='min-h-screen w-full grid grid-cols-[auto_1fr]'>
      <div className='flex flex-col p-6 bg-blue-400 flex-shrink-0'>
        <Link href='/home' className='flex items-center gap-2'>
          <BookCheck size={40} fill='white' />
          <h1 className='text-3xl font-bold text-white'>TaskMaster</h1>
        </Link>
        <div className='mt-auto'>
          <LogoutPopover username={session.user.username} />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
