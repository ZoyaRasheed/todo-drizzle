import React, { useState, useRef, useEffect } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.description);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleUpdate = () => {
        if (editValue.trim() !== todo.description) {
            onUpdate(todo.id, editValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            setEditValue(todo.description);
            setIsEditing(false);
        }
    };

    return (
        <div className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>

            {/* Custom Checkbox - CSS handles the look */}
            <div
                className={`status-badge ${todo.status}`}
                onClick={() => onToggle(todo.id)}
                title={`Mark as ${todo.status === 'completed' ? 'pending' : 'completed'}`}
            >
                {/* No text, just the box */}
            </div>

            {/* Content */}
            <div className="todo-content">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="todo-description editing"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className="todo-description"
                        onDoubleClick={() => setIsEditing(true)}
                        title="Double click to edit"
                    >
                        {todo.description}
                    </span>
                )}
            </div>

            {/* Actions - Scribbly Buttons */}
            <div className="todo-actions">
                <button
                    className="btn-icon"
                    onClick={() => setIsEditing(!isEditing)}
                    aria-label="Edit"
                >
                    ✎
                </button>
                <button
                    className="btn-icon btn-danger"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
