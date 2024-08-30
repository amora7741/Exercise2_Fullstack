type Priority = 'Low' | 'Medium' | 'High';

type Task = {
  title: string;
  description: string;
  priority: Priority;
  user_id: number;
  id: number;
};
