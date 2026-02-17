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
        <li className="group flex items-center justify-between py-1 px-2 border-b border-paper-line/50 hover:bg-ink-blue/5 transition-colors leading-[2.5rem]">

            {/* Checkbox / Bullet point */}
            <div
                className={`cursor-pointer w-6 h-6 mr-4 flex-shrink-0 border-2 border-ink-blue rounded-md flex items-center justify-center transition-all ${
                    todo.status === 'completed' ? 'bg-ink-blue' : 'hover:bg-ink-blue/10'
                }`}
                onClick={() => onToggle(todo.id)}
                title={`Mark as ${todo.status === 'completed' ? 'pending' : 'completed'}`}
            >
                {todo.status === 'completed' && (
                    <span className="text-white font-bold transform -rotate-6">✓</span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 mr-4">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-b-2 border-ink-blue outline-none font-kalam text-xl text-ink-blue"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <span
                        className={`block truncate font-kalam text-xl cursor-text select-none ${
                            todo.status === 'completed' 
                            ? 'line-through decoration-wavy decoration-red-500 opacity-60 text-ink-blue/70' 
                            : 'text-ink-blue'
                        }`}
                        onDoubleClick={() => setIsEditing(true)}
                        title="Double click to edit"
                    >
                        {todo.description}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="p-1 hover:text-ink-blue/70 transition-colors"
                    onClick={() => setIsEditing(!isEditing)}
                    aria-label="Edit"
                >
                    <span className="text-lg">✎</span>
                </button>
                <button
                    className="p-1 hover:text-red-600 transition-colors"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                >
                    <span className="text-lg font-bold">✕</span>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
