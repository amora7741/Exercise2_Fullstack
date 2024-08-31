'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
        <Accordion
          className='max-h-[80vh] overflow-auto'
          type='single'
          collapsible
        >
          {tasks.map((task) => (
            <AccordionItem key={task.id} value={`item-${task.id}`}>
              <AccordionTrigger>
                <div className='flex justify-between w-full'>
                  <p>{task.title}</p>
                  <p>{task.priority} Priority</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {task.description || 'No description provided.'}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default TaskList;
