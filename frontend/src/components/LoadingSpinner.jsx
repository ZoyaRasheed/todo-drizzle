import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-ink-blue/20 border-t-ink-blue"></div>
        </div>
    );
};

export default LoadingSpinner;
