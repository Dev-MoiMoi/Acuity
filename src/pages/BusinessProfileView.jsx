import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiMapPin, FiClock, FiPhoneCall, FiMessageCircle, FiCheckCircle, FiInfo, FiFlag, FiAlertTriangle, FiEdit2, FiX } from 'react-icons/fi';

const BusinessProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBusinessById, getCategoryById, calculateDistance, getLandmarkById, flagBusiness } = useMockData();
  const { user } = useAuth();

  const [showFlagSection, setShowFlagSection] = useState(false);
  const [flagReason, setFlagReason] = useState('');

  const business = getBusinessById(id);

  if (!business) {
    return (
      <div className="container py-12 flex-col items-center justify-center text-center">
        <h2 className="font-bold text-2xl mb-4">Business Not Found</h2>
        <p className="text-muted mb-6">The business you are looking for does not exist or has been removed.</p>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  const category = getCategoryById(business.categoryId);
  const landmark = getLandmarkById(business.landmarkId);
  const isFlagged = business.flagCount >= 3;

  const handleFlagSubmit = () => {
    if (!flagReason) return;
    flagBusiness(business.id, flagReason);
    setShowFlagSection(false);
    setFlagReason('');
    alert('Thank you for reporting. The community has been alerted.');
  };

  return (
    <div className="bg-[--background] min-h-screen pb-12">
      {/* Header/Banner Area */}
      <div className="relative h-[200px] w-full bg-[#E5E9EC] overflow-hidden rounded-b-3xl shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

        {/* Mock Placeholder pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, #000 10px ), repeating-linear-gradient( #E5E9EC, #E5E9EC )`
        }}></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
          <div>
            {category && (
              <span className="badge bg-white text-primary px-3 py-1 mb-2 shadow-sm font-bold shadow-black/10 inline-flex items-center gap-1">
                {category.icon} {category.name}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-md">
              {business.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium drop-shadow-sm">
              <FiMapPin />
              <span>Near {landmark ? landmark.name : (business.address || 'Unknown')}</span>
              <span>•</span>
              <span>{business.locationType}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6">

        {isFlagged && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '12px' }}>
            <FiAlertTriangle style={{ color: 'var(--error)', flexShrink: 0, marginTop: '2px' }} size={22} />
            <div>
              <h3 style={{ fontWeight: 700, color: 'var(--error)' }}>Community Warning</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                This profile has been flagged {business.flagCount} times by residents for being inaccurate, nonsensical, or invalid.
                Please exercise caution.
              </p>
              {business.flagReasons && business.flagReasons.length > 0 && (
                <div style={{ marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(239,68,68,0.3)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <strong>Reported reasons:</strong>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '16px', marginTop: '4px' }}>
                    {[...new Set(business.flagReasons)].map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Actions */}
        <div className="flex gap-4 mb-6 sticky top-[70px] z-10 bg-[--background] py-2 border-b border-[--border]">
          <a href={`tel:${business.contact}`} className="flex-1 btn btn-primary flex justify-center py-4 text-base shadow-sm">
            <FiPhoneCall size={20} /> Call Now
          </a>
          {business.facebookUrl ? (
            <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="flex-1 btn btn-outline flex justify-center py-4 text-base">
              <FiMessageCircle size={20} /> Message
            </a>
          ) : (
            <button disabled className="flex-1 btn btn-outline opacity-50 cursor-not-allowed flex justify-center py-4 text-base">
              <FiMessageCircle size={20} /> No FB
            </button>
          )}
        </div>

        {/* Community Actions Card */}
        <div className="card flex justify-between items-center mb-6 shadow-sm">
          <Link to={`/business/${business.id}/edit`} className="text-primary font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FiEdit2 /> Edit Profile
          </Link>
          <button
            onClick={() => {
              setShowFlagSection(true);
              setTimeout(() => document.getElementById('flag-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="text-danger font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <FiFlag /> Flag Profile
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">

          <div className="flex-col gap-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><FiInfo className="text-primary" /> About</h3>
              <p className="text-secondary leading-relaxed text-sm md:text-base">{business.description}</p>

              <div className="mt-4 pt-4 border-t border-[--border] flex items-start gap-3">
                <FiClock className="mt-1 text-muted" />
                <div>
                  <p className="text-sm font-semibold">Operating Hours</p>
                  <p className="text-sm text-secondary">{business.operatingHours || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {business.services.map((service, idx) => (
                  <span key={idx} className="bg-[--background] border border-[--border] text-primary font-medium px-4 py-2 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">Community Trust</h3>
              <ul className="flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className={`p-1 rounded-full ${business.verifiedContact ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted'}`}>
                    <FiCheckCircle size={18} />
                  </span>
                  <span className="text-sm font-medium text-secondary">Contact details provided</span>
                </li>
                <li className="flex items-center gap-3 mt-2">
                  <span className={`p-1 rounded-full ${business.communityEngaged ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted'}`}>
                    <FiCheckCircle size={18} />
                  </span>
                  <span className="text-sm font-medium text-secondary">Active community member</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-col gap-6">
            <div className="card flex-col">
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-sm text-secondary mb-4">{business.address}</p>

              <div className="bg-[#e5e5f7] border border-[--border] rounded-lg h-[200px] relative overflow-hidden"
                style={{
                  backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #E5E9EC, #E5E9EC )`
                }}>
                {/* Internal Mock Map Pin */}
                <div className="absolute flex-col items-center transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${landmark?.coordinates?.x || 50}%`, top: `${landmark?.coordinates?.y || 50}%` }}>
                  <div className="text-primary drop-shadow-md text-3xl">
                    <FiMapPin />
                  </div>
                  <div className="text-xs font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap -mt-1" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    {business.name}
                  </div>
                </div>
              </div>
              <Link to="/map" className="btn btn-secondary btn-full mt-4 text-sm font-semibold">
                View on Full Map
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Flagging Section */}
      {showFlagSection && (
        <div id="flag-section" className="container mt-8 mb-12 animate-fade-in-up">
          <div className="card border border-danger/20 shadow-sm relative">
            <button
              onClick={() => setShowFlagSection(false)}
              className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-danger">
              <FiFlag /> Flag this profile
            </h3>
            <p className="text-sm text-secondary mb-4">
              Help keep our community directory accurate. Why are you reporting this profile?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Fake or dummy profile', 'Location is inaccurate', 'Contact number is invalid', 'Business is permanently closed', 'Inappropriate content'].map(reason => (
                <label
                  key={reason}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    border: `1px solid ${flagReason === reason ? 'rgba(239,68,68,0.4)' : 'var(--border-strong)'}`,
                    background: flagReason === reason ? 'rgba(239,68,68,0.07)' : 'var(--bg-elevated)',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="flagReason"
                    value={reason}
                    checked={flagReason === reason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--error)', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: flagReason === reason ? 600 : 500, color: flagReason === reason ? 'var(--error)' : 'var(--text-primary)' }}>{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                disabled={!flagReason}
                onClick={handleFlagSubmit}
                className="btn bg-danger text-white flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Report
              </button>
              <button
                onClick={() => {
                  setShowFlagSection(false);
                  setFlagReason('');
                }}
                className="btn btn-outline flex-1 py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProfileView;
