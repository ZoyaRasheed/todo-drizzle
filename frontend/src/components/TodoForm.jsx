import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        onAdd(e, newTodo);
        setNewTodo('');
    };

    return (
        <section className="add-todo-section">
            <form onSubmit={handleSubmit} className="add-todo-form glass">
                <input
                    type="text"
                    className="add-todo-input"
                    placeholder="What needs to be done?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    <span>Add Todo</span>
                    <span>+</span>
                </button>
            </form>
        </section>
    );
};

export default TodoForm;
