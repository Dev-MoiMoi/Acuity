import React from 'react';
import './styles/design-system.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MockDataProvider } from './context/MockDataContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResidentDashboard from './pages/ResidentDashboard';
import SearchResults from './pages/SearchResults';
import BusinessProfileView from './pages/BusinessProfileView';
import ResidentProfile from './pages/ResidentProfile';
import OwnerDashboard from './pages/OwnerDashboard';
import EditBusinessProfile from './pages/EditBusinessProfile';
import OwnerAnalytics from './pages/OwnerAnalytics';
import MapPage from './pages/MapPage';

const Placeholder = ({ title }) => (
  <div className="container py-4 flex-col items-center justify-center h-full">
    <h2>{title}</h2>
    <p className="text-muted mt-2">This page is under construction.</p>
  </div>
);

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, isResident, isOwner } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={
          isAuthenticated
            ? <Navigate to={isResident ? "/resident" : "/owner"} />
            : <LandingPage />
        } />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Resident Routes */}
        <Route path="resident" element={
          <ProtectedRoute role="resident"><ResidentDashboard /></ProtectedRoute>
        } />
        <Route path="search" element={
          <ProtectedRoute role="resident"><SearchResults /></ProtectedRoute>
        } />
        <Route path="business/:id" element={
          <ProtectedRoute><BusinessProfileView /></ProtectedRoute> // Both can view
        } />
        <Route path="profile" element={
          <ProtectedRoute role="resident"><ResidentProfile /></ProtectedRoute>
        } />

        {/* Owner Routes */}
        <Route path="owner" element={
          <ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>
        } />
        <Route path="owner/edit-profile" element={
          <ProtectedRoute role="owner"><EditBusinessProfile /></ProtectedRoute>
        } />
        <Route path="owner/analytics" element={
          <ProtectedRoute role="owner"><OwnerAnalytics /></ProtectedRoute>
        } />
        <Route path="owner/settings" element={
          <ProtectedRoute role="owner"><Placeholder title="Owner Settings" /></ProtectedRoute>
        } />

        {/* Shared Routes */}
        <Route path="map" element={
          <ProtectedRoute><MapPage /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <MockDataProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MockDataProvider>
    </AuthProvider>
  );
}

export default App;
