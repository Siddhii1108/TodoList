import React from 'react';
import { CheckCircle, Circle, ListTodo } from 'lucide-react';
import { FilterType } from '../types/Task';

interface EmptyStateProps {
  filter: FilterType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <CheckCircle className="text-green-400" size={48} />,
          title: "All caught up!",
          message: "You have no active tasks. Great job!"
        };
      case 'completed':
        return {
          icon: <Circle className="text-gray-400" size={48} />,
          title: "No completed tasks",
          message: "Complete some tasks to see them here."
        };
      default:
        return {
          icon: <ListTodo className="text-blue-400" size={48} />,
          title: "No tasks yet",
          message: "Add your first task to get started!"
        };
    }
  };

  const { icon, title, message } = getEmptyStateContent();

  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;