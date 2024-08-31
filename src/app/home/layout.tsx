import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BookCheck } from 'lucide-react';
import LogoutPopover from '@/components/LogoutPopover';
import { notFound } from 'next/navigation';
import SidebarOptions from '@/components/SidebarOptions';
import MobileNavbar from '@/components/MobileNavbar';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  return (
    <div className='min-h-screen w-full md:grid grid-cols-[auto_1fr]'>
      <MobileNavbar username={session.user.username} />

      <div className='hidden md:flex flex-col p-6 px-8 bg-blue-400 flex-shrink-0'>
        <Link href='/home' className='flex items-center gap-2 mb-8'>
          <BookCheck size={40} fill='white' />
          <h1 className='text-3xl font-bold text-white'>TaskMaster</h1>
        </Link>
        <SidebarOptions />
        <div className='mt-auto'>
          <LogoutPopover username={session.user.username} />
        </div>
      </div>

      <main className='max-w-screen-2xl w-full flex flex-col mx-auto p-8'>
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;
