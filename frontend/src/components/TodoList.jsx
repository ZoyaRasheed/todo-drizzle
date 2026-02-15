import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

const TodoList = ({ todos, loading, filter, searchQuery, onToggle, onDelete, onUpdate }) => {
    // Filter todos logic is passed down or done here?
    // App.jsx passed `filteredTodos`. Let's assume `todos` prop IS the filtered list.
    // However, for EmptyState logic to work correctly with "No todos yet" vs "No results", we need to know if we are filtering?
    // Actually, App.jsx handles the filtering and passes `filteredTodos`.
    // But EmptyState needs `filter` and `searchQuery` to show the right message.

    if (loading) {
        return <LoadingSpinner />;
    }

    if (todos.length === 0) {
        return <EmptyState filter={filter} searchQuery={searchQuery} />;
    }

    return (
        <div className="todos-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

export default TodoList;
