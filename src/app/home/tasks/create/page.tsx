import CreateTaskForm from '@/components/CreateTaskForm';
import PageHeader from '@/components/PageHeader';

const CreateTaskPage = () => {
  return (
    <>
      <PageHeader>Create a Task</PageHeader>
      <CreateTaskForm mode='create' />
    </>
  );
};

export default CreateTaskPage;
