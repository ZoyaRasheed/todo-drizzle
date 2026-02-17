import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

    const TodoList = ({ todos, loading, filter, searchQuery, onToggle, onDelete, onUpdate }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink-blue"></div>
            </div>
        );
    }

    if (todos.length === 0) {
        return <EmptyState filter={filter} isSearch={!!searchQuery} />;
    }

    return (
        <div className="mt-6">
            <ul className="flex flex-col">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
