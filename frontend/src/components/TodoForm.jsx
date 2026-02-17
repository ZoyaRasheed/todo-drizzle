import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        onAdd(e, description);
        setDescription('');
    };

    return (
        <div className="add-todo-section">
            <form className="add-todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="add-todo-input"
                    placeholder="Add a new task... (Press Enter)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
