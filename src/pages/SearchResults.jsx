import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';
import BusinessCard from '../components/BusinessCard';
import { FiSearch, FiFilter, FiAlertCircle } from 'react-icons/fi';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { businesses, categories, calculateDistance } = useMockData();
  const { user } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialCategory = queryParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('nearest'); // 'nearest' or 'newest'
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulate network delay for skeletons
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = businesses.filter(b => b.isActive);

      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        filtered = filtered.filter(b =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.services.some(s => s.toLowerCase().includes(q))
        );
      }

      if (initialCategory) {
        filtered = filtered.filter(b => b.categoryId === initialCategory);
      }

      if (sortBy === 'nearest') {
        filtered.sort((a, b) => parseFloat(calculateDistance(user.location, a.coordinates)) - parseFloat(calculateDistance(user.location, b.coordinates)));
      } else {
        filtered.sort((a, b) => new Date(b.stats.created) - new Date(a.stats.created));
      }

      setResults(filtered);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [initialQuery, initialCategory, sortBy, businesses, user.location, calculateDistance]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="container py-6">
      <div className="flex-col gap-4 mb-6 sticky top-[70px] bg-[--background] z-10 py-4 shadow-sm border-b border-[--border] -mx-4 px-4">
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
          <div className="relative flex-1 flex items-center">
            <span className="absolute left-3 text-muted"><FiSearch /></span>
            <input
              type="text"
              className="input-field pl-10 w-full mb-0"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <select
            className="input-field text-sm py-2 px-3 m-0 border border-[--border] bg-white"
            style={{ marginBottom: 0, minWidth: '140px', paddingRight: '30px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            className="input-field text-sm py-2 px-3 m-0 border border-[--border] bg-white flex-shrink-0"
            style={{ marginBottom: 0, paddingRight: '25px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="nearest">Nearest</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="results-container">
        <h2 className="font-bold text-lg mb-4">
          {loading ? 'Searching...' : `Found ${results.length} results`}
        </h2>

        {loading ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card h-48 flex-col gap-3">
                <div className="flex justify-between">
                  <div className="skeleton skeleton-text short"></div>
                  <div className="skeleton w-16 h-6 rounded-full"></div>
                </div>
                <div className="skeleton skeleton-text w-1/4"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="mt-auto skeleton h-8 rounded-full w-24"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {results.map(b => (
              <BusinessCard key={b.id} business={b} distance={calculateDistance(user.location, b.coordinates)} />
            ))}
          </div>
        ) : (
          <div className="flex-col items-center justify-center py-16 text-center text-muted">
            <FiAlertCircle className="text-4xl mb-4 text-[--border]" />
            <p className="font-semibold text-lg text-secondary">No services found</p>
            <p className="text-sm mt-2 max-w-xs">We couldn't find anything matching your search. Try different keywords or browse all categories.</p>
            <button
              className="btn btn-outline mt-6"
              onClick={() => { setQuery(''); setSelectedCategory(''); navigate('/search'); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
