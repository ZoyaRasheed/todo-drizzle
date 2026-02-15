import React from 'react';

const EmptyState = ({ filter, searchQuery }) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3 className="empty-state-title">
                {searchQuery
                    ? 'No todos found'
                    : filter === 'completed'
                        ? 'No completed todos yet'
                        : filter === 'pending'
                            ? 'No pending todos'
                            : 'No todos yet'}
            </h3>
            <p className="empty-state-text">
                {searchQuery
                    ? 'Try searching with different keywords'
                    : 'Add your first todo to get started!'}
            </p>
        </div>
    );
};

export default EmptyState;
