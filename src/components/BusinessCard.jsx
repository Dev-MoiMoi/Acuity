import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCheckCircle, FiZap, FiArrowUpRight } from 'react-icons/fi';
import { useMockData } from '../context/MockDataContext';

const BusinessCard = ({ business, distance, recommended }) => {
    const { getCategoryById } = useMockData();
    const category = getCategoryById(business.categoryId);

    return (
        <Link
            to={`/business/${business.id}`}
            style={{
                display: 'block',
                minWidth: '280px',
                maxWidth: '340px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                color: 'inherit',
            }}
            className="biz-card-link"
        >
            {/* Recommended Badge */}
            {recommended && (
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)',
                    background: 'rgba(20, 184, 166, 0.1)', padding: '4px 12px',
                    borderRadius: '9999px', marginBottom: '10px',
                }}>
                    <FiZap size={12} /> Recommended for You
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                        fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)',
                        lineHeight: 1.3, marginBottom: '6px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {business.name}
                    </h3>
                    {category && (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.65rem', fontWeight: 600, color: 'var(--primary)',
                            background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.2)',
                            padding: '3px 10px', borderRadius: '9999px',
                        }}>
                            {category.icon} {category.name}
                        </span>
                    )}
                </div>
                <div style={{
                    width: '38px', height: '38px', borderRadius: 'var(--radius-md)',
                    background: 'rgba(20, 184, 166, 0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    color: 'var(--primary)', marginLeft: '10px',
                }}>
                    <FiArrowUpRight size={16} />
                </div>
            </div>

            {/* Distance */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '8px',
            }}>
                <FiMapPin style={{ color: 'var(--primary)', flexShrink: 0 }} size={13} />
                <span>{distance} km away</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>·</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{business.locationType}</span>
            </div>

            {/* Description */}
            <p style={{
                fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '10px',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
                {business.description}
            </p>

            {/* Service Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                {business.services.slice(0, 3).map((service, idx) => (
                    <span key={idx} style={{
                        fontSize: '0.65rem', padding: '3px 8px', borderRadius: '9999px',
                        background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                        border: '1px solid var(--border)', fontWeight: 500,
                    }}>
                        {service}
                    </span>
                ))}
                {business.services.length > 3 && (
                    <span style={{
                        fontSize: '0.65rem', padding: '3px 8px', borderRadius: '9999px',
                        background: 'var(--bg-elevated)', color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                    }}>
                        +{business.services.length - 3}
                    </span>
                )}
            </div>

            {/* Footer */}
            <div style={{
                paddingTop: '10px', borderTop: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {business.verifiedContact && (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.65rem', fontWeight: 600, color: 'var(--success)',
                            background: 'rgba(34, 197, 94, 0.1)', padding: '3px 8px', borderRadius: '9999px',
                        }}>
                            <FiCheckCircle size={11} /> Verified
                        </span>
                    )}
                    {business.communityEngaged && (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.65rem', fontWeight: 600, color: 'var(--secondary)',
                            background: 'rgba(99, 102, 241, 0.1)', padding: '3px 8px', borderRadius: '9999px',
                        }}>
                            Community
                        </span>
                    )}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--primary)' }}>
                    View →
                </span>
            </div>
        </Link>
    );
};

export default BusinessCard;
