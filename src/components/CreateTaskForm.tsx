'use client';

import { Task, taskSchema } from '@/lib/validation/task';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const CreateTaskForm = () => {
  const { toast } = useToast();

  const createTask = async (data: Task) => {
    try {
      await axios.post('/api/tasks', data);

      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Task created successfully!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error creating the task.',
      });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Task>({ resolver: zodResolver(taskSchema) });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className='space-y-8' onSubmit={handleSubmit(createTask)}>
      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='title'>Task Title</label>
        <input
          {...register('title')}
          placeholder='Title'
          className='p-2 rounded-md border-2'
          id='title'
        />
        {errors.title && (
          <p className='absolute -bottom-6 right-0 text-red-900 font-semibold'>
            {errors.title?.message}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='description'>Task Description</label>
        <input
          {...register('description')}
          placeholder='Description'
          className='p-2 rounded-md border-2'
          id='description'
        />
        {errors.description && (
          <p className='absolute -bottom-6 right-0 text-red-900 font-semibold'>
            {errors.description?.message}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-2 relative'>
        <label htmlFor='priority'>Priority</label>
        <select
          {...register('priority')}
          className='p-2 rounded-md border-2'
          id='priority'
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        {errors.priority && (
          <p className='absolute -bottom-6 right-0 text-red-900 font-semibold'>
            {errors.priority?.message}
          </p>
        )}
      </div>

      <button
        className='flex items-center justify-center bg-blue-600 w-full p-4 rounded-lg font-bold text-white hover:bg-blue-700'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <p>Create Task</p>
        )}
      </button>
    </form>
  );
};

export default CreateTaskForm;
