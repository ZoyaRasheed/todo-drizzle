import React from 'react';

const TodoFilter = ({ searchQuery, setSearchQuery, filter, setFilter, stats = { total: 0, pending: 0, completed: 0 } }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b-2 border-paper-line pb-4 border-dashed font-kalam">
            <div className="flex gap-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1 text-lg transition-all ${filter === 'all'
                            ? 'font-bold underline decoration-wavy decoration-ink-blue text-ink-blue'
                            : 'text-gray-500 hover:text-ink-blue'
                        }`}
                >
                    All ({stats.total})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-1 text-lg transition-all ${filter === 'pending'
                            ? 'font-bold underline decoration-wavy decoration-ink-blue text-ink-blue'
                            : 'text-gray-500 hover:text-ink-blue'
                        }`}
                >
                    Pending ({stats.pending})
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-1 text-lg transition-all ${filter === 'completed'
                            ? 'font-bold underline decoration-wavy decoration-ink-blue text-ink-blue'
                            : 'text-gray-500 hover:text-ink-blue'
                        }`}
                >
                    Done ({stats.completed})
                </button>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-1 text-lg focus:outline-none focus:border-ink-blue w-48 font-kalam"
                />
            </div>
        </div>
    );
};

export default TodoFilter;
