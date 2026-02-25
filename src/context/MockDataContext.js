import React, { createContext, useState, useContext } from 'react';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

// SVG Category Icons
const IconFood = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11h10a4 4 0 0 1 0 8H7a4 4 0 0 1 0-8z" /><path d="M12 11V7a3 3 0 0 0-3-3" /><path d="M11 21v-2" /><path d="M15 21v-2" />
    </svg>
);
const IconCart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
);
const IconShirt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
);
const IconWrench = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);
const IconScissors = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" /><path d="M8.12 8.12L12 12" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8L20 20" /><path d="M8.12 15.88L16 8" /><path d="M16 8l4-4" />
    </svg>
);
const IconBasket = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" /><path d="M3 10h18l-2 11H5L3 10z" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
    </svg>
);
const IconPackage = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
);

// Initial Categories
export const CATEGORIES = [
    { id: 'c1', name: 'Food & Beverages', icon: <IconFood /> },
    { id: 'c2', name: 'Sari-Sari / Convenience', icon: <IconCart /> },
    { id: 'c3', name: 'Clothing / RTW', icon: <IconShirt /> },
    { id: 'c4', name: 'Repair Services', icon: <IconWrench /> },
    { id: 'c5', name: 'Personal Care / Salon', icon: <IconScissors /> },
    { id: 'c6', name: 'Laundry', icon: <IconBasket /> },
    { id: 'c7', name: 'Other Services', icon: <IconPackage /> }
];

// Initial mock businesses in Barangay Banay-Banay context
const INITIAL_BUSINESSES = [
    {
        id: 'b1',
        ownerId: 'owner-1',
        name: "Aling Nena's Sari-Sari Store",
        categoryId: 'c2',
        services: ['Groceries', 'Load', 'Ice', 'Snacks'],
        locationType: 'Stall-based',
        address: 'Block 4, Lot 12, Banay-Banay',
        coordinates: { x: 40, y: 55 }, // Relative coordinates 0-100 for the SVG map
        contact: '09123456789',
        facebookUrl: 'https://facebook.com/alingnena',
        description: 'Your friendly neighborhood convenience store. We sell everyday essentials, cold drinks, and e-load.',
        operatingHours: '6:00 AM - 10:00 PM',
        verifiedContact: true,
        communityEngaged: true,
        isActive: true,
        stats: { impressions: 145, inquiries: 24, created: '2023-10-12' },
        isOpen: true
    },
    {
        id: 'b2',
        ownerId: 'owner-2',
        name: "Kuya Jun's Vulcanizing & Repair",
        categoryId: 'c4',
        services: ['Vulcanizing', 'Bike Repair', 'Basic Motor Tools'],
        locationType: 'Stall-based',
        address: 'Main Road corner Purok 2',
        coordinates: { x: 70, y: 30 },
        contact: '09987654321',
        facebookUrl: '',
        description: 'Fast and reliable tire patching and bike repairs. Located right at the highway entrance.',
        operatingHours: '7:00 AM - 6:00 PM',
        verifiedContact: true,
        communityEngaged: false,
        isActive: true,
        stats: { impressions: 89, inquiries: 15, created: '2024-01-05' },
        isOpen: true
    },
    {
        id: 'b3',
        ownerId: 'owner-3',
        name: 'Maria\'s Home Kitchen',
        categoryId: 'c1',
        services: ['Silog Meals', 'Pancit Bilao', 'Made-to-order Desserts'],
        locationType: 'Home-based',
        address: 'Purok 3, Interior',
        coordinates: { x: 50, y: 80 },
        contact: '09191234567',
        facebookUrl: 'https://facebook.com/mariashomekitchen',
        description: 'Freshly cooked home meals for pre-order. We accept bulk orders for parties within the barangay.',
        operatingHours: '9:00 AM - 5:00 PM (Pre-order)',
        verifiedContact: true,
        communityEngaged: true,
        isActive: true,
        stats: { impressions: 210, inquiries: 45, created: '2024-03-20' },
        isOpen: false // currently closed
    },
    {
        id: 'b4',
        ownerId: 'owner-4',
        name: 'Fresh Start Laundry',
        categoryId: 'c6',
        services: ['Wash & Fold', 'Dry Cleaning', 'Ironing'],
        locationType: 'Stall-based',
        address: 'Purok 1, near the Court',
        coordinates: { x: 30, y: 65 },
        contact: '09223344556',
        facebookUrl: '',
        description: 'Affordable labada services. Pick-up and delivery available for nearby blocks.',
        operatingHours: '8:00 AM - 8:00 PM',
        verifiedContact: true,
        communityEngaged: true,
        isActive: true,
        stats: { impressions: 175, inquiries: 30, created: '2023-11-15' },
        isOpen: true
    }
];

export const MockDataProvider = ({ children }) => {
    const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
    const categories = CATEGORIES;

    const addBusiness = (businessData) => {
        const newBusiness = {
            ...businessData,
            id: `b${Date.now()}`,
            isActive: true,
            stats: { impressions: 0, inquiries: 0, created: new Date().toISOString().split('T')[0] }
        };
        setBusinesses([...businesses, newBusiness]);
        return newBusiness;
    };

    const updateBusiness = (businessId, data) => {
        setBusinesses(businesses.map(b => b.id === businessId ? { ...b, ...data } : b));
    };

    const getBusinessById = (id) => businesses.find(b => b.id === id);
    const getBusinessesByOwner = (ownerId) => businesses.filter(b => b.ownerId === ownerId);
    const getCategoryById = (id) => categories.find(c => c.id === id);

    // Helper to calculate mock distance (Pythagorean theorem on our 0-100 internal grid)
    // Distance will be returned as "X km" visually, we'll map 1 grid unit to 0.05 km
    const calculateDistance = (coord1, coord2) => {
        if (!coord1 || !coord2) return 0;
        const dx = coord1.x - coord2.x;
        const dy = coord1.y - coord2.y;
        const gridDist = Math.sqrt(dx * dx + dy * dy);
        return (gridDist * 0.05).toFixed(1); // arbitrary multiplier for visual km
    };

    const value = {
        businesses,
        categories,
        addBusiness,
        updateBusiness,
        getBusinessById,
        getBusinessesByOwner,
        getCategoryById,
        calculateDistance
    };

    return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>;
};
