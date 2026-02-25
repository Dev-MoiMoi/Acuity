import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMockData } from '../context/MockDataContext';
import BusinessCard from '../components/BusinessCard';
import { FiSearch, FiArrowRight, FiMapPin } from 'react-icons/fi';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { businesses, categories, calculateDistance } = useMockData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  // Sort businesses by distance from the resident
  const nearestBusinesses = [...businesses]
    .filter(b => b.isActive)
    .sort((a, b) => {
      const distA = parseFloat(calculateDistance(user.location, a.coordinates));
      const distB = parseFloat(calculateDistance(user.location, b.coordinates));
      return distA - distB;
    })
    .slice(0, 5); // top 5

  // Sorted by newest (mock created date)
  const newestBusinesses = [...businesses]
    .filter(b => b.isActive)
    .sort((a, b) => new Date(b.stats.created) - new Date(a.stats.created))
    .slice(0, 5);

  return (
    <div className="container py-6 relative">
      <div className="bg-primary text-white p-6 rounded-2xl mb-8 mt-4 shadow-lg flex-col gap-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
        <h2 className="text-2xl font-bold z-10 relative">Hello, {user.name.split(' ')[0]} 👋</h2>
        <p className="z-10 relative opacity-90">What service are you looking for today in Banay-Banay?</p>

        <form onSubmit={handleSearch} className="z-10 relative mt-4">
          <div className="relative flex items-center shadow-lg rounded-full w-full max-w-xl">
            <span className="absolute left-4 text-muted text-xl"><FiSearch /></span>
            <input
              type="text"
              className="w-full py-4 pl-12 pr-6 rounded-full border-none focus:outline-none focus:ring-4 focus:ring-white/30 text-primary font-medium"
              placeholder="e.g., Vulcanizing, Sari-Sari, Laundry"
              style={{ color: 'var(--text-primary)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 btn btn-primary py-2 px-4 rounded-full text-sm">
              Search
            </button>
          </div>
        </form>

        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Categories</h3>
          <Link to="/search" className="text-sm font-semibold text-primary flex items-center gap-1">View All <FiArrowRight /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none' }}>
          {categories.map(c => (
            <Link key={c.id} to={`/search?category=${c.id}`} className="snap-start flex-col items-center gap-2 flex-shrink-0 card p-4 w-28 hover:border-primary border border-transparent transition-colors">
              <span className="text-3xl bg-[--background] p-3 rounded-full">{c.icon}</span>
              <span className="text-xs font-semibold text-center mt-2 leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Nearest to You (<FiMapPin className="inline text-primary" />)</h3>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none' }}>
          {nearestBusinesses.length > 0 ? (
            nearestBusinesses.map((b) => (
              <div key={b.id} className="snap-start flex-shrink-0 relative top-0 hover:-top-2 transition-all">
                <BusinessCard
                  business={b}
                  distance={calculateDistance(user.location, b.coordinates)}
                />
              </div>
            ))
          ) : (
            <p className="text-muted text-center w-full py-8">No businesses found nearby.</p>
          )}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recently Added</h3>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none' }}>
          {newestBusinesses.map((b) => (
            <div key={b.id} className="snap-start flex-shrink-0">
              <BusinessCard
                business={b}
                distance={calculateDistance(user.location, b.coordinates)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResidentDashboard;
