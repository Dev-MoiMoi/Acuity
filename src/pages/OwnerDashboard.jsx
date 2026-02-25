import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMockData } from '../context/MockDataContext';
import { FiEye, FiMessageCircle, FiCalendar, FiEdit, FiTrendingUp } from 'react-icons/fi';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const { getBusinessesByOwner } = useMockData();

  // An owner might have one or more, we'll pick the first
  const myBusinesses = getBusinessesByOwner(user.id);
  const primaryBusiness = myBusinesses[0];

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h2 className="font-bold text-2xl">Hello, {user.name.split(' ')[0]} 👋</h2>
        {primaryBusiness ? (
          <p className="text-secondary">Managing <strong>{primaryBusiness.name}</strong></p>
        ) : (
          <p className="text-secondary">Welcome to your business dashboard</p>
        )}
      </div>

      {primaryBusiness ? (
        <>
          <h3 className="font-bold text-lg mb-4">Quick Overview</h3>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="card flex items-center gap-4 bg-gradient-to-br from-white to-[#F0F8FF]">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <FiEye size={24} />
              </div>
              <div>
                <p className="text-muted text-sm font-semibold">Profile Views</p>
                <p className="text-2xl font-bold">{primaryBusiness.stats.impressions}</p>
              </div>
            </div>

            <div className="card flex items-center gap-4 bg-gradient-to-br from-white to-[#F9FFE8]">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <FiMessageCircle size={24} />
              </div>
              <div>
                <p className="text-muted text-sm font-semibold">Inquiries / Clicks</p>
                <p className="text-2xl font-bold">{primaryBusiness.stats.inquiries}</p>
              </div>
            </div>

            <div className="card flex items-center gap-4 bg-gradient-to-br from-white to-[#FFF5F5]">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FiCalendar size={24} />
              </div>
              <div>
                <p className="text-muted text-sm font-semibold">Listed Since</p>
                <p className="text-lg font-bold">{new Date(primaryBusiness.stats.created).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-4">Manage</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/owner/edit-profile" className="card card-interactive flex items-start gap-4">
              <div className="p-3 bg-[--background] text-primary rounded-lg"><FiEdit size={24} /></div>
              <div>
                <h4 className="font-bold mb-1">Edit Business Profile</h4>
                <p className="text-sm text-secondary">Update your services, contact details, operating hours, and location pin.</p>
              </div>
            </Link>

            <Link to="/owner/analytics" className="card card-interactive flex items-start gap-4">
              <div className="p-3 bg-[--background] text-primary rounded-lg"><FiTrendingUp size={24} /></div>
              <div>
                <h4 className="font-bold mb-1">View Analytics</h4>
                <p className="text-sm text-secondary">See detailed reports on your visibility and engagement over time.</p>
              </div>
            </Link>

            <Link to={`/business/${primaryBusiness.id}`} className="card card-interactive flex items-start gap-4 md:col-span-2 bg-[#FFFAFA] border border-[--primary-light]">
              <div className="p-3 bg-white text-primary rounded-lg"><FiEye size={24} /></div>
              <div>
                <h4 className="font-bold mb-1">Preview Public Profile</h4>
                <p className="text-sm text-secondary">See exactly how residents view your business listing.</p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="card text-center py-12 flex-col items-center">
          <div className="text-muted mb-4"><FiEdit size={48} /></div>
          <h3 className="font-bold text-xl mb-2">No Business Found</h3>
          <p className="text-secondary mb-6 max-w-sm">You haven't set up your business profile yet. Create one to start reaching residents in Banay-Banay.</p>
          <Link to="/owner/edit-profile" className="btn btn-primary">Create Profile Now</Link>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
