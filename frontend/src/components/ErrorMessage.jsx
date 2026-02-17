import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="bg-red-50/80 border-l-4 border-red-500 text-red-700 p-4 mb-4 font-kalam relative" role="alert">
            <span className="block sm:inline">{message}</span>
            <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transform rotate-12">!</div>
        </div>
    );
};

export default ErrorMessage;
