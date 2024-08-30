'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

const LogoutPopover = ({ username }: { username: string }) => {
  const { toast } = useToast();

  const logOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while signing out.',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='flex justify-between w-full items-center bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-white'>
          <p className='font-semibold'>@{username}</p>
          <LogOut />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-700'
            onClick={logOut}
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutPopover;
