import React, { useState, useMemo } from 'react';
import { ListTodo } from 'lucide-react';
import { Task, FilterType } from './types/Task';
import useLocalStorage from './hooks/useLocalStorage';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskItem from './components/TaskItem';
import EmptyState from './components/EmptyState';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ListTodo size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <p className="text-blue-100 text-sm">
                  {taskCounts.active} of {taskCounts.all} tasks remaining
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <TaskInput onAddTask={addTask} />
            
            <TaskFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />

            <div className="space-y-0">
              {filteredTasks.length === 0 ? (
                <EmptyState filter={filter} />
              ) : (
                filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Stay organized and productive! 🚀</p>
        </div>
      </div>
    </div>
  );
}

export default App;