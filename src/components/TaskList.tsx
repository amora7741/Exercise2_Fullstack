'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

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
        <ul className='space-y-4 max-h-[80vh] overflow-auto'>
          {tasks.map((task) => (
            <li className='p-4 bg-blue-300 rounded-lg' key={task.id}>
              <div className='flex justify-between'>
                <p>{task.title}</p>
                <p>{task.priority} Priority</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
