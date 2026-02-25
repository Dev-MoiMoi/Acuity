import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with webpack/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Banay-Banay, Cabuyao center coordinates
const BANAY_BANAY_CENTER = [14.2744, 121.1258];
const DEFAULT_ZOOM = 16;

// Custom teal pin icon
const createCustomIcon = (color = '#14B8A6', size = 28) => {
    return L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="
            width: ${size}px; height: ${size}px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
    });
};

// User location blue pulsing dot
const userLocationIcon = L.divIcon({
    className: 'user-location-pin',
    html: `<div style="
        width: 16px; height: 16px;
        background: #3B82F6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 6px rgba(59,130,246,0.25), 0 2px 8px rgba(0,0,0,0.2);
        animation: pulse-blue 2s infinite;
    "></div>
    <style>
        @keyframes pulse-blue {
            0% { box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.2); }
            50% { box-shadow: 0 0 0 10px rgba(59,130,246,0.1), 0 2px 8px rgba(0,0,0,0.2); }
            100% { box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.2); }
        }
    </style>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

/**
 * Reusable OpenStreetMap component centered on Banay-Banay, Cabuyao
 *
 * Props:
 * - businesses: array of business objects with lat/lng or coordinates
 * - userLocation: { lat, lng } for the user's position
 * - onPinClick: callback when a business pin is clicked
 * - selectedId: ID of the currently selected business
 * - height: CSS height (default '100%')
 * - interactive: allow pan/zoom (default true)
 * - zoom: initial zoom level
 * - showControls: show zoom controls (default true)
 */
const BanayBanayMap = ({
    businesses = [],
    userLocation = null,
    onPinClick,
    selectedId,
    height = '100%',
    interactive = true,
    zoom = DEFAULT_ZOOM,
    showControls = true,
    getCategoryById,
}) => {

    // Convert the old 0-100 coordinate system to lat/lng around Banay-Banay
    // The grid spans roughly 0.008 degrees (about 890m) in each direction
    const toLatLng = (coords) => {
        if (!coords) return BANAY_BANAY_CENTER;
        if (coords.lat && coords.lng) return [coords.lat, coords.lng];
        // Map 0-100 grid to a small area around Banay-Banay center
        const lat = BANAY_BANAY_CENTER[0] + ((50 - coords.y) / 50) * 0.004;
        const lng = BANAY_BANAY_CENTER[1] + ((coords.x - 50) / 50) * 0.005;
        return [lat, lng];
    };

    const businessMarkers = businesses.map(b => ({
        id: b.id,
        position: toLatLng(b.coordinates),
        business: b,
    }));

    const userPos = userLocation
        ? toLatLng(userLocation)
        : BANAY_BANAY_CENTER;

    return (
        <div style={{ height, width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
            <MapContainer
                center={BANAY_BANAY_CENTER}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={interactive}
                dragging={interactive}
                zoomControl={showControls}
                doubleClickZoom={interactive}
                touchZoom={interactive}
                attributionControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location marker */}
                {userLocation && (
                    <Marker position={userPos} icon={userLocationIcon}>
                        <Popup>
                            <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                                📍 You are here
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Business markers */}
                {businessMarkers.map(({ id, position, business }) => {
                    const isSelected = selectedId === id;
                    const cat = getCategoryById ? getCategoryById(business.categoryId) : null;
                    return (
                        <Marker
                            key={id}
                            position={position}
                            icon={createCustomIcon(
                                isSelected ? '#0D9488' : '#14B8A6',
                                isSelected ? 34 : 26
                            )}
                            eventHandlers={{
                                click: () => onPinClick && onPinClick(business),
                            }}
                        >
                            <Popup>
                                <div style={{ minWidth: '180px' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                                        {business.name}
                                    </div>
                                    {cat && (
                                        <div style={{ fontSize: '0.7rem', color: '#14B8A6', fontWeight: 600, marginBottom: '4px' }}>
                                            {cat.name}
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                                        {business.address}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export { BANAY_BANAY_CENTER, DEFAULT_ZOOM };
export default BanayBanayMap;
