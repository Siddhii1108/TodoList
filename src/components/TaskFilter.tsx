import React from 'react';
import { FilterType } from '../types/Task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`
            flex-1 px-4 py-2 text-sm font-medium rounded-md
            transition-all duration-200 ease-in-out transform
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${currentFilter === key
              ? 'bg-white text-blue-600 shadow-sm scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }
          `}
        >
          {label}
          <span className={`ml-1 text-xs ${currentFilter === key ? 'text-blue-400' : 'text-gray-400'}`}>
            ({count})
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;