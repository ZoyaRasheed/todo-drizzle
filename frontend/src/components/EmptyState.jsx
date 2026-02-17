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
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">
                {isSearch ? 'No Results' : 'All Clear'}
            </h3>
            <p className="empty-state-text">{message}</p>
        </div>
    );
};

export default EmptyState;
