'use client';

import Link from 'next/link';
import { BookCheck, Menu, X } from 'lucide-react';
import SidebarOptions from '@/components/SidebarOptions';
import LogoutPopover from '@/components/LogoutPopover';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MobileNavbar = ({ username }: { username: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  return (
    <>
      <div className='flex md:hidden items-center justify-between p-4 bg-blue-400'>
        <Link href='/home' className='flex items-center gap-2'>
          <BookCheck size={32} fill='white' />
          <h1 className='text-2xl font-bold text-white'>TaskMaster</h1>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X size={28} className='text-white' />
          ) : (
            <Menu size={28} className='text-white' />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-blue-400 p-6 flex flex-col md:hidden'>
          <Link href='/home' className='flex items-center gap-2 mb-8'>
            <BookCheck size={40} fill='white' />
            <h1 className='text-3xl font-bold text-white'>TaskMaster</h1>
          </Link>
          <SidebarOptions />
          <div className='mt-auto'>
            <LogoutPopover username={username} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
