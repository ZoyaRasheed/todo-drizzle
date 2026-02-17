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
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a new task..."
                    className="w-full bg-transparent border-b-2 border-gray-400 focus:border-ink-blue outline-none py-2 px-4 text-2xl placeholder:text-gray-400 placeholder:italic transition-colors font-kalam"
                />
            </div>
            <button
                type="submit"
                className="font-bold text-xl px-6 py-2 border-2 border-ink-blue rounded-full transform hover:scale-105 active:scale-95 transition-transform hover:bg-ink-blue/5 -rotate-2 font-kalam text-ink-blue"
            >
                Add +
            </button>
        </form>
    );
};

export default TodoForm;
