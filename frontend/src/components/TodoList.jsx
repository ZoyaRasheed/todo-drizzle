import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

const TodoList = ({ todos, loading, filter, searchQuery, onToggle, onDelete, onUpdate }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (todos.length === 0) {
        return <EmptyState filter={filter} isSearch={!!searchQuery} />;
    }

    return (
        <div className="todos-section">
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
        </div>
    );
};

export default TodoList;
