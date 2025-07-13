import React, { useState } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div
      className={`
        group bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3
        transition-all duration-300 ease-in-out transform
        hover:shadow-md hover:-translate-y-0.5
        ${isDeleting ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100 translate-x-0'}
        ${task.completed ? 'bg-gray-50' : ''}
        animate-fade-in
      `}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200 ease-in-out transform
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-blue-400'
            }
          `}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <Check 
              size={14} 
              className="animate-scale-in" 
            />
          )}
        </button>

        <span
          className={`
            flex-1 transition-all duration-200 ease-in-out
            ${task.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-800'
            }
          `}
        >
          {task.text}
        </span>

        <button
          onClick={handleDelete}
          className="
            opacity-0 group-hover:opacity-100 p-1 rounded-full
            text-gray-400 hover:text-red-500 hover:bg-red-50
            transition-all duration-200 ease-in-out transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          "
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;