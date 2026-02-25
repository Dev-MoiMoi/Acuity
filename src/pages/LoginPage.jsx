import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Auto-detect role based on email for testing/demo purposes
        const success = login(email, password);
        if (success) {
            if (email.includes('owner')) {
                navigate('/owner');
            } else {
                navigate('/resident');
            }
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container py-8 flex items-center justify-center min-h-[70vh]">
            <div className="card w-full max-w-[400px]">
                <h2 className="text-center font-bold mb-2" style={{ fontSize: 'var(--font-size-2xl)' }}>Welcome Back</h2>
                <p className="text-center text-muted mb-6 text-sm">Login to BarangayConnect</p>

                {error && <div className="p-3 mb-4 rounded bg-[#FFEBEE] text-[--error] text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="flex-col">
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiMail /></span>
                            <input
                                type="email"
                                className="input-field pl-10"
                                placeholder="juandelacruz@email.com (or owner@email.com)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <span className="text-xs text-muted mt-1">Hint: use 'owner' in email to login as Business</span>
                    </div>

                    <div className="input-group">
                        <label className="input-label flex justify-between">
                            Password
                            <Link to="#" className="text-primary font-normal text-xs">Forgot Password?</Link>
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted"><FiLock /></span>
                            <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full mt-4">
                        Login <FiArrowRight />
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account? <Link to="/register" className="text-primary font-semibold">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
