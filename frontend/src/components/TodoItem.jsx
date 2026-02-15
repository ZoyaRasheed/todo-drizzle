import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.description || todo.descrption); // Handle potential typo in data if any

    const handleUpdate = () => {
        if (!editText.trim()) {
            handleCancel();
            return;
        }
        onUpdate(todo.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(todo.description || todo.descrption);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div className={`todo-item glass ${todo.status === 'completed' ? 'completed' : ''}`}>


            <div className="todo-content">
                {isEditing ? (
                    <input
                        type="text"
                        className="todo-description editing"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <p className="todo-description">
                        {todo.description || todo.descrption}
                    </p>
                )}
            </div>

            <div className="todo-actions">
                <span
                    className={`status-badge ${todo.status ? todo.status.toLowerCase() : 'pending'}`}
                    onClick={() => onToggle(todo.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle status"
                >
                    <span className="status-dot"></span>
                    {todo.status || 'Pending'}
                </span>
                {isEditing ? (
                    <>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={handleUpdate}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-sm btn-icon"
                            onClick={handleCancel}
                        >
                            ✕
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-sm btn-icon"
                            onClick={() => setIsEditing(true)}
                            title="Edit"
                        >
                            ✏️
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => onDelete(todo.id)}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;
