import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiSearch, FiMap, FiUser, FiPieChart, FiSettings, FiList, FiLogOut } from 'react-icons/fi';
import './Layout.css';

const Layout = () => {
    const { user, isAuthenticated, isResident, isOwner, logout } = useAuth();
    const location = useLocation();

    const getNavLinks = () => {
        if (!isAuthenticated) return [];

        if (isResident) {
            return [
                { path: '/resident', icon: <FiHome />, label: 'Home' },
                { path: '/search', icon: <FiSearch />, label: 'Search' },
                { path: '/map', icon: <FiMap />, label: 'Map' },
                { path: '/profile', icon: <FiUser />, label: 'Profile' }
            ];
        }

        if (isOwner) {
            return [
                { path: '/owner', icon: <FiHome />, label: 'Dashboard' },
                { path: '/owner/edit-profile', icon: <FiList />, label: 'My Business' },
                { path: '/owner/analytics', icon: <FiPieChart />, label: 'Analytics' },
                { path: '/owner/settings', icon: <FiSettings />, label: 'Settings' }
            ];
        }
        return [];
    };

    const navLinks = getNavLinks();

    return (
        <div className="layout-container">
            {/* Top Navbar for all screens */}
            <header className="navbar glass-panel">
                <div className="container flex justify-between items-center py-4">
                    <Link to="/" className="logo-link">
                        <h1 className="logo-text">Barangay<span className="text-primary">Connect</span></h1>
                    </Link>

                    <div className="desktop-actions flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="user-info flex items-center gap-4">
                                <span className="text-sm font-semibold hidden-mobile">Hi, {user.name}</span>
                                <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px' }}>
                                    <FiLogOut /> <span className="hidden-mobile">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="auth-links flex gap-2">
                                <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px' }}>Login</Link>
                                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="main-wrapper container">
                {/* Desktop Sidebar */}
                {isAuthenticated && (
                    <aside className="sidebar hidden-mobile">
                        <nav className="sidebar-nav">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    <span className="icon">{link.icon}</span>
                                    <span className="label">{link.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>
                )}

                {/* Main Content Area */}
                <main className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            {isAuthenticated && (
                <nav className="bottom-nav hidden-desktop glass-panel">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`bottom-nav-item ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            <span className="icon">{link.icon}</span>
                            <span className="label">{link.label}</span>
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
};

export default Layout;
