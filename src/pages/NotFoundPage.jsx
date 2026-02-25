import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
    return (
        <div className="container py-16 flex-col items-center justify-center text-center min-h-[60vh]">
            <div className="text-[--primary-light] mb-6">
                <FiAlertTriangle size={80} />
            </div>
            <h1 className="font-bold text-4xl mb-4 text-primary-text">404</h1>
            <h2 className="font-bold text-xl mb-2">Pachib! Page Not Found</h2>
            <p className="text-secondary max-w-sm mx-auto mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary flex items-center gap-2">
                <FiHome /> Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
