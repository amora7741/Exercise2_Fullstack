'use client';

import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import CreateTaskForm from '@/components/CreateTaskForm';

const Task = ({ task }: { task: Task }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    <li className='border border-gray-300 rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-center'>
        {isEditing ? (
          <CreateTaskForm mode='edit' task={task} />
        ) : (
          <>
            <div>
              <h3 className='text-lg font-semibold'>{task.title}</h3>
              <p>{task.description || 'No description provided.'}</p>
              <p className='text-sm text-gray-500'>{task.priority} Priority</p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setIsEditing(true)}
                className='p-2 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg'
              >
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
          </>
        )}
      </div>
    </li>
  );
};

export default Task;
