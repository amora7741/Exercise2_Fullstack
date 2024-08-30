'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getUserTasks = async () => {
      const response = await axios.get('/api/tasks');

      const parsedTasks: Task[] = response.data.tasks;

      setTasks(parsedTasks);
    };

    getUserTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};

export default TaskList;
