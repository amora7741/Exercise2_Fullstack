'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');

        const parsedTasks: Task[] = response.data.tasks;

        setTasks(parsedTasks);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getUserTasks();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderCircle className='size-10 text-blue-400 animate-spin mx-auto' />
      ) : (
        <ul className='max-h-[80vh] overflow-auto'>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
