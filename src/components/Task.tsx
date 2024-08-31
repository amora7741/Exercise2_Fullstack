'use client';

import { useState } from 'react';
import axios from 'axios';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useToast } from '@/components/ui/use-toast';

const Task = ({ task }: { task: Task }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/tasks/${task.id}`);

      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Your task was deleted successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while deleting your task.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AccordionItem value={`item-${task.id}`}>
      <AccordionTrigger>
        <div className='flex justify-between w-full'>
          <p>{task.title}</p>
          <p>{task.priority} Priority</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col w-full'>
          <p>{task.description || 'No description provided.'}</p>
          <div className='flex gap-2 ml-auto'>
            <button className='p-2 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg'>
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className='p-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-lg'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Task;
