import React from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const CategoryBrowse = () => {
    const { categories } = useMockData();

    return (
        <div className="container py-8">
            <h2 className="font-bold text-2xl mb-2 text-center">Browse Categories</h2>
            <p className="text-secondary text-center mb-8">Tap a category to discover related services in Banay-Banay.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(c => (
                    <Link
                        key={c.id}
                        to={`/search?category=${c.id}`}
                        className="card card-interactive flex-col items-center justify-center p-6 text-center h-40 hover:border-primary border border-transparent"
                    >
                        <div className="text-4xl mb-3 bg-[--background] p-4 rounded-full">
                            {c.icon}
                        </div>
                        <h3 className="font-bold text-sm leading-tight text-primary-text">{c.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryBrowse;
