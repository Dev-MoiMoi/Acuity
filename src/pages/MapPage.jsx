import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiNavigation, FiX } from 'react-icons/fi';

const MapPage = () => {
  const { businesses, getCategoryById } = useMockData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPin, setSelectedPin] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');

  const activeBusinesses = businesses.filter(b => b.isActive && (filterCategory ? b.categoryId === filterCategory : true));

  return (
    <div className="flex-col h-[calc(100vh-70px-80px)] md:h-[calc(100vh-70px)] relative">

      {/* Map Header / Filters */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        <select
          className="input-field py-2 px-3 text-sm bg-white shadow-md border-none flex-shrink-0"
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setSelectedPin(null); }}
          style={{ marginBottom: 0, borderRadius: '24px' }}
        >
          <option value="">All Services</option>
          {Array.from(new Set(businesses.map(b => b.categoryId))).map(cId => {
            const cat = getCategoryById(cId);
            return <option key={cId} value={cId}>{cat?.name}</option>;
          })}
        </select>

        <button
          className="btn py-2 px-4 shadow-md text-sm whitespace-nowrap flex-shrink-0 bg-white border-none"
          onClick={() => navigate('/search')}
        >
          List View
        </button>
      </div>

      {/* Internal Map Container */}
      <div className="flex-1 map-container relative bg-[#E8F0F2]" style={{
        backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        opacity: 1,
        border: 'none',
        borderRadius: 0,
        overflow: 'hidden'
      }}>

        {/* User Location Pin */}
        {user?.location && (
          <div className="map-pin" style={{ left: `${user.location.x}%`, top: `${user.location.y}%`, zIndex: 5 }}>
            <div className="bg-blue-500 text-white w-4 h-4 rounded-full border-2 border-white shadow-md animate-pulse"></div>
            <div className="bg-white/80 backdrop-blur-sm text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm mt-1">
              You
            </div>
          </div>
        )}

        {/* Business Pins */}
        {activeBusinesses.map(b => {
          const cat = getCategoryById(b.categoryId);
          const isSelected = selectedPin?.id === b.id;

          return (
            <div
              key={b.id}
              className={`map-pin transition-all duration-300 ${isSelected ? 'scale-125 z-30' : 'z-10'}`}
              style={{ left: `${b.coordinates.x}%`, top: `${b.coordinates.y}%` }}
              onClick={() => setSelectedPin(b)}
            >
              <div className={`map-pin-icon ${isSelected ? 'text-primary' : 'text-secondary'}`}>
                {isSelected ? <FiMapPin size={32} /> : <FiMapPin size={28} />}
              </div>

              {!isSelected && (
                <div className="bg-white text-secondary text-[10px] font-bold px-1 py-0.5 rounded shadow whitespace-nowrap -mt-2">
                  {cat?.icon}
                </div>
              )}
            </div>
          );
        })}

        {/* Selected Pin Popup / Bottom Sheet */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-white rounded-xl shadow-lg border border-[--border] p-4 z-40 animate-fade-in-up">
            <button
              className="absolute top-2 right-2 p-2 text-muted hover:text-primary transition-colors"
              onClick={() => setSelectedPin(null)}
            >
              <FiX />
            </button>

            <div className="pr-6">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">
                {getCategoryById(selectedPin.categoryId)?.name}
              </span>
              <h3 className="font-bold text-lg leading-tight mb-1">{selectedPin.name}</h3>
              <p className="text-sm text-muted mb-3 line-clamp-1">{selectedPin.address}</p>

              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-primary flex-1 py-2 text-sm"
                  onClick={() => navigate(`/business/${selectedPin.id}`)}
                >
                  View Profile
                </button>
                <a
                  href={`https://google.com/maps/dir/?api=1&destination=${selectedPin.coordinates.x},${selectedPin.coordinates.y}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline p-2 border border-primary text-primary flex items-center justify-center rounded-full w-10 h-10"
                  aria-label="Get Directions"
                >
                  <FiNavigation />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MapPage;
