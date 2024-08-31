import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Task = ({ task }: { task: Task }) => {
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
            <button className='p-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-lg'>
              Delete
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Task;
