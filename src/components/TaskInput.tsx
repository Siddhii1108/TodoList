import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddTask(trimmedValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="
            w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg
            shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 ease-in-out
          "
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="
            absolute right-2 top-1/2 transform -translate-y-1/2
            p-2 rounded-lg bg-blue-500 text-white
            hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200 ease-in-out transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
          aria-label="Add task"
        >
          <Plus size={16} />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;