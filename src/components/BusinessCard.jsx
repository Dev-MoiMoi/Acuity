import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useMockData } from '../context/MockDataContext';

const BusinessCard = ({ business, distance }) => {
    const { getCategoryById } = useMockData();
    const category = getCategoryById(business.categoryId);

    return (
        <Link to={`/business/${business.id}`} className="card card-interactive flex-col" style={{ minWidth: '280px', maxWidth: '350px' }}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {business.name}
                </h3>
                {category && (
                    <span className="badge badge-secondary ml-2">
                        {category.icon} {category.name}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1 text-sm text-secondary font-medium mb-3">
                <FiMapPin />
                <span>{distance} km away</span>
                <span className="text-muted text-xs ml-1">({business.locationType})</span>
            </div>

            <p className="text-sm text-muted mb-4 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {business.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {business.services.slice(0, 3).map((service, idx) => (
                    <span key={idx} className="badge bg-surface border" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                        {service}
                    </span>
                ))}
                {business.services.length > 3 && (
                    <span className="badge bg-surface border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                        +{business.services.length - 3}
                    </span>
                )}
            </div>

            <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {business.verifiedContact && (
                            <span className="text-success text-xs flex items-center gap-1 bg-[#E8F8F5] py-1 px-2 rounded-full">
                                <FiCheckCircle /> Verified
                            </span>
                        )}
                    </div>
                    <span className="text-primary font-semibold text-sm group-hover:underline">
                        View Profile &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BusinessCard;
