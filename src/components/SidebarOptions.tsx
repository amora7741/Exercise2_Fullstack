import { SidebarOption } from '@/types/sidebar';
import { Plus, ClipboardList } from 'lucide-react';

import Link from 'next/link';

const sideOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Create Task',
    href: '/home/tasks/create',
    Icon: Plus,
  },
  {
    id: 2,
    name: 'View Tasks',
    href: '/home/tasks',
    Icon: ClipboardList,
  },
];

const SidebarOptions = () => {
  return (
    <nav>
      <ul className='space-y-2'>
        {sideOptions.map((option) => (
          <li key={option.id}>
            <Link href={option.href}>
              <div className='flex items-center p-2 rounded-lg hover:bg-white/10'>
                <option.Icon className='size-7 mr-2 shrink-0' color='white' />
                <p className='text-white font-bold text-xl'>{option.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarOptions;
