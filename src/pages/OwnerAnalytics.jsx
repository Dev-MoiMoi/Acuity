import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMockData } from '../context/MockDataContext';
import { FiTrendingUp, FiEye, FiMessageCircle, FiActivity } from 'react-icons/fi';

const OwnerAnalytics = () => {
  const { user } = useAuth();
  const { getBusinessesByOwner } = useMockData();

  const myBusinesses = getBusinessesByOwner(user.id);
  const business = myBusinesses[0];

  if (!business) {
    return (
      <div className="container py-8 text-center text-muted">
        <FiActivity className="text-4xl mx-auto mb-4" />
        <h2>No analytics available</h2>
        <p>Please create your business profile first to track your visibility.</p>
      </div>
    );
  }

  // Mock data for the chart layout
  const weeklyData = [
    { day: 'Mon', views: 12, clicks: 2 },
    { day: 'Tue', views: 19, clicks: 4 },
    { day: 'Wed', views: 15, clicks: 3 },
    { day: 'Thu', views: 25, clicks: 6 },
    { day: 'Fri', views: 32, clicks: 8 },
    { day: 'Sat', views: 45, clicks: 12 },
    { day: 'Sun', views: 38, clicks: 9 },
  ];

  const maxViews = Math.max(...weeklyData.map(d => d.views));

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-2xl">Analytics</h2>
          <p className="text-secondary text-sm">Performance for {business.name}</p>
        </div>
        <select className="input-field py-1 px-3 text-sm bg-white" style={{ minWidth: "auto", marginBottom: 0 }}>
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-[#FFF5F5] to-white border border-[#FFEBEB]">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <FiEye /> <span className="font-semibold text-sm">Total Views</span>
          </div>
          <div className="text-3xl font-bold mb-1">{business.stats.impressions}</div>
          <div className="text-xs text-success flex items-center gap-1"><FiTrendingUp /> +18% from last week</div>
        </div>

        <div className="card bg-gradient-to-br from-[#F0F8FF] to-white border border-[#E6F0F9]">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <FiMessageCircle /> <span className="font-semibold text-sm">Total Inquiries</span>
          </div>
          <div className="text-3xl font-bold mb-1">{business.stats.inquiries}</div>
          <div className="text-xs text-success flex items-center gap-1"><FiTrendingUp /> +5% from last week</div>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="font-bold text-lg mb-6">Views This Week</h3>

        {/* Vanilla CSS Bar Chart Mockup */}
        <div className="flex items-end justify-between h-48 gap-2 mt-4 px-2">
          {weeklyData.map((data, index) => {
            const heightPercentage = (data.views / maxViews) * 100;
            return (
              <div key={index} className="flex-col items-center flex-1 h-full justify-end group cursor-pointer relative">

                {/* View Toll-tip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                  {data.views} views<br />{data.clicks} clicks
                </div>

                {/* Bar */}
                <div
                  className="w-full max-w-[40px] rounded-t-sm transition-all duration-500 ease-out group-hover:brightness-110"
                  style={{
                    height: `${heightPercentage}%`,
                    background: 'linear-gradient(to top, var(--primary-light), var(--primary))',
                    minHeight: '4px'
                  }}
                ></div>

                {/* Label */}
                <div className="text-xs text-muted mt-2 font-medium">{data.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-lg mb-4">Top Search Terms</h3>
        <p className="text-sm text-secondary mb-4">Keywords residents used to find your profile:</p>

        <div className="flex flex-wrap gap-2">
          <span className="badge bg-[--background] border border-[--border] text-primary px-3 py-1">sari sari store (42%)</span>
          <span className="badge bg-[--background] border border-[--border] text-primary px-3 py-1">near me (28%)</span>
          <span className="badge bg-[--background] border border-[--border] text-secondary px-3 py-1">{business.services[0]?.toLowerCase()} (15%)</span>
          <span className="badge bg-[--background] border border-[--border] px-3 py-1">groceries (10%)</span>
          <span className="badge bg-[--background] border border-[--border] px-3 py-1">others (5%)</span>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalytics;
