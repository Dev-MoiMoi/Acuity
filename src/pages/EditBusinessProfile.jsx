import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMockData } from '../context/MockDataContext';
import { FiSave, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const EditBusinessProfile = () => {
  const { user } = useAuth();
  const { getBusinessesByOwner, categories, updateBusiness, addBusiness } = useMockData();
  const navigate = useNavigate();

  const myBusinesses = getBusinessesByOwner(user.id);
  const existingBusiness = myBusinesses.length > 0 ? myBusinesses[0] : null;

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    services: '',
    locationType: 'Stall-based',
    address: '',
    contact: '',
    facebookUrl: '',
    description: '',
    operatingHours: '',
    verifiedContact: false,
    communityEngaged: false,
    isOpen: true,
    coordinates: { x: 50, y: 50 }
  });

  useEffect(() => {
    if (existingBusiness) {
      setFormData({
        ...existingBusiness,
        services: existingBusiness.services.join(', ')
      });
    } else {
      setFormData(prev => ({
        ...prev,
        contact: user.contact || ''
      }));
    }
  }, [existingBusiness, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMapClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - bounds.left) / bounds.width) * 100);
    const y = Math.round(((e.clientY - bounds.top) / bounds.height) * 100);
    setFormData({ ...formData, coordinates: { x, y } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert services string back to array
    const businessData = {
      ...formData,
      services: formData.services.split(',').map(s => s.trim()).filter(Boolean),
      ownerId: user.id
    };

    if (existingBusiness) {
      updateBusiness(existingBusiness.id, businessData);
      alert('Profile updated successfully!');
    } else {
      const newBus = addBusiness(businessData);
      user.businessId = newBus.id; // update mock user state
      alert('Business Profile created!');
    }
    navigate('/owner');
  };

  return (
    <div className="container py-6 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl">{existingBusiness ? 'Edit Business Profile' : 'Create Profile'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-col gap-6">

        {/* Basic Info */}
        <div className="card">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Basic Information</h3>

          <div className="input-group">
            <label className="input-label">Business Name</label>
            <input required type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Category</label>
              <select required name="categoryId" className="input-field" value={formData.categoryId} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Location Type</label>
              <select name="locationType" className="input-field" value={formData.locationType} onChange={handleChange}>
                <option value="Stall-based">Stall-based (Commercial)</option>
                <option value="Home-based">Home-based (Residential)</option>
                <option value="Mobile/Roving">Mobile / Roving</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea required name="description" className="input-field" rows="3" placeholder="Tell residents what your business is about..." value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="input-group">
            <label className="input-label">Services Offered (comma separated)</label>
            <input required type="text" name="services" className="input-field" placeholder="e.g. Vulcanizing, Oil Change, Car Wash" value={formData.services} onChange={handleChange} />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="card">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Contact & Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Contact Number</label>
              <input required type="tel" name="contact" className="input-field" placeholder="09XX XXX XXXX" value={formData.contact} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Facebook Page / Link (Optional)</label>
              <input type="url" name="facebookUrl" className="input-field" placeholder="https://facebook.com/..." value={formData.facebookUrl} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Street Address (Within Banay-Banay)</label>
              <input required type="text" name="address" className="input-field" placeholder="Block 1, Purok 2..." value={formData.address} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Operating Hours</label>
              <input type="text" name="operatingHours" className="input-field" placeholder="e.g. 8:00 AM - 5:00 PM, Mon-Sat" value={formData.operatingHours} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group mt-2">
            <label className="input-label flex justify-between">
              <span>Map Pin Location</span>
              <span className="text-xs text-primary">Click map to move pin</span>
            </label>
            <div className="bg-[#e5e5f7] border border-[--border] rounded-lg h-[200px] relative cursor-pointer overflow-hidden"
              onClick={handleMapClick}
              style={{ backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #e5e5f7 10px), repeating-linear-gradient(#E5E9EC, #E5E9EC)` }}>
              <div className="absolute text-primary text-3xl drop-shadow-md z-10 transition-all duration-300" style={{ left: `${formData.coordinates.x}%`, top: `${formData.coordinates.y}%`, transform: 'translate(-50%, -100%)' }}>
                <FiMapPin />
              </div>
            </div>
            <p className="text-xs text-muted mt-1">This helps residents see how close you are to them.</p>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Community Trust Indicators</h3>
          <p className="text-sm text-secondary mb-4">Check the items that apply to your business. This builds trust with residents.</p>

          <label className="flex items-center gap-3 p-3 border rounded-lg mb-2 cursor-pointer hover:bg-[--background]">
            <input type="checkbox" name="verifiedContact" className="w-5 h-5 accent-primary" checked={formData.verifiedContact} onChange={handleChange} />
            <div>
              <p className="font-semibold flex items-center gap-1"><FiCheckCircle className="text-success" /> Verified Contact</p>
              <p className="text-xs text-muted">I confirm the contact number provided is active and reachable.</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg mb-2 cursor-pointer hover:bg-[--background]">
            <input type="checkbox" name="communityEngaged" className="w-5 h-5 accent-primary" checked={formData.communityEngaged} onChange={handleChange} />
            <div>
              <p className="font-semibold flex items-center gap-1"><FiCheckCircle className="text-success" /> Community Member</p>
              <p className="text-xs text-muted">I actively participate or engage with the Barangay community.</p>
            </div>
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-full py-4 text-lg">
          <FiSave /> {existingBusiness ? 'Save Changes' : 'Publish Business Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditBusinessProfile;
