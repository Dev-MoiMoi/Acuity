import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMockData } from '../context/MockDataContext';
import { FiUser, FiMail, FiLock, FiHome, FiMapPin, FiBriefcase, FiPhone, FiArrowRight } from 'react-icons/fi';

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, login } = useAuth();
    const { categories } = useMockData();

    // Parse role from URL query param, default to resident
    const queryParams = new URLSearchParams(location.search);
    const initialRole = queryParams.get('role') || 'resident';

    const [role, setRole] = useState(initialRole);

    // Shared fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    // Resident fields
    const [address, setAddress] = useState('');

    // Owner fields
    const [businessName, setBusinessName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // Map mock coords
    const [coords, setCoords] = useState({ x: 50, y: 50 });

    useEffect(() => {
        // If user changes toggle, update email mock to help them test if they want
        if (role === 'owner' && !email.includes('owner')) {
            setEmail('newowner@email.com');
        } else if (role === 'resident' && email.includes('owner')) {
            setEmail('newresident@email.com');
        }
    }, [role]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            contact,
            role,
            location: coords, // mock coordinate pin
            ...(role === 'resident' ? { address } : { businessName, categoryId })
        };

        register(userData);
        login(email, password); // Auto login

        if (role === 'owner') {
            navigate('/owner');
        } else {
            navigate('/resident');
        }
    };

    return (
        <div className="container py-8 flex justify-center">
            <div className="card w-full max-w-[500px]">
                <h2 className="text-center font-bold mb-2" style={{ fontSize: 'var(--font-size-2xl)' }}>Create Account</h2>
                <p className="text-center text-muted mb-6 text-sm">Join the Barangay Banay-Banay network</p>

                {/* Role Toggle */}
                <div className="flex bg-[--background] p-1 rounded-full mb-6">
                    <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${role === 'resident' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
                        onClick={() => setRole('resident')}
                    >
                        I'm a Resident
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${role === 'owner' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
                        onClick={() => setRole('owner')}
                    >
                        I'm a Business Owner
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-col">
                    {/* Shared Fields */}
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiUser /></span>
                            <input required type="text" className="input-field pl-10" placeholder="Juan Dela Cruz" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Mobile Number</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiPhone /></span>
                            <input required type="tel" className="input-field pl-10" placeholder="09123456789" value={contact} onChange={e => setContact(e.target.value)} />
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {role === 'resident' ? (
                        <div className="input-group">
                            <label className="input-label">Address (within Barangay)</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-muted"><FiHome /></span>
                                <input required type="text" className="input-field pl-10" placeholder="e.g. Purok 1, Block 2" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="input-group">
                                <label className="input-label">Business Name</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 text-muted"><FiBriefcase /></span>
                                    <input required type="text" className="input-field pl-10" placeholder="Aling Nena's Store" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Business Category</label>
                                <select required className="input-field" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                                    <option value="">Select a category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Mock Location Picker */}
                    <div className="input-group">
                        <label className="input-label flex justify-between">
                            <span>Pin Location</span>
                            <span className="text-xs text-primary">Map Mock</span>
                        </label>
                        <div className="bg-[--background] border border-[--border] rounded-md h-[100px] flex items-center justify-center relative cursor-pointer"
                            onClick={(e) => {
                                const bounds = e.currentTarget.getBoundingClientRect();
                                const x = Math.round(((e.clientX - bounds.left) / bounds.width) * 100);
                                const y = Math.round(((e.clientY - bounds.top) / bounds.height) * 100);
                                setCoords({ x, y });
                            }}>
                            <div className="absolute text-primary text-2xl" style={{ left: `${coords.x}%`, top: `${coords.y}%`, transform: 'translate(-50%, -100%)' }}>
                                <FiMapPin />
                            </div>
                            <p className="text-xs text-muted pointer-events-none">Click to adjust pin</p>
                        </div>
                    </div>

                    {/* Account Fields */}
                    <div className="input-group mt-2">
                        <label className="input-label">Email</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiMail /></span>
                            <input required type="email" className="input-field pl-10" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiLock /></span>
                            <input required type="password" className="input-field pl-10" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full mt-6">
                        Create Account <FiArrowRight />
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted">
                    Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
