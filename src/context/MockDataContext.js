import React, { createContext, useState, useContext } from 'react';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

// Initial Categories
export const CATEGORIES = [
    { id: 'c1', name: 'Food & Beverages', icon: '🍔' },
    { id: 'c2', name: 'Sari-Sari / Convenience', icon: '🛒' },
    { id: 'c3', name: 'Clothing / RTW', icon: '👗' },
    { id: 'c4', name: 'Repair Services', icon: '🔧' },
    { id: 'c5', name: 'Personal Care / Salon', icon: '💇' },
    { id: 'c6', name: 'Laundry', icon: '🧺' },
    { id: 'c7', name: 'Other Services', icon: '📦' }
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
