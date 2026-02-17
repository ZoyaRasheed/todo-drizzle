import React from 'react';

const TodoFilter = ({ filter, setFilter }) => {
    const filters = ['all', 'pending', 'completed'];

    return (
        <div className="filter-tabs">
            {filters.map((f) => (
                <button
                    key={f}
                    className={`filter-tab ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default TodoFilter;
