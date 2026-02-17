import React from 'react';

const EmptyState = ({ filter, isSearch }) => {
    let message = "No tasks yet. Add one to get started.";
    let icon = "📝";

    if (isSearch) {
        message = "No tasks found matching your search.";
        icon = "🔍";
    } else if (filter === 'pending') {
        message = "No pending tasks. You're all caught up!";
        icon = "🎉";
    } else if (filter === 'completed') {
        message = "No completed tasks yet. Get to work!";
        icon = "☕";
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60 font-kalam">
            <div className="text-6xl mb-4 animate-bounce">{icon}</div>
            <h3 className="text-3xl font-bold mb-2 text-ink-blue underline decoration-wavy decoration-margin-line">
                {isSearch ? 'No Results' : 'All Clear'}
            </h3>
            <p className="text-xl text-ink-blue/80 transform -rotate-1">{message}</p>
        </div>
    );
};

export default EmptyState;
