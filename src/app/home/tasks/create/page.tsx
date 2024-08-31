import TaskForm from '@/components/TaskForm';
import PageHeader from '@/components/PageHeader';

const CreateTaskPage = () => {
  return (
    <>
      <PageHeader>Create a Task</PageHeader>
      <TaskForm mode='create' />
    </>
  );
};

export default CreateTaskPage;
