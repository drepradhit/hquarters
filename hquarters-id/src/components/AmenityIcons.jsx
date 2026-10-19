import React from 'react';

/**
 * Bespoke Architectural SVG Icons for HQuarters Function Room Amenities
 * High-end corporate/hospitality iconography with 1.75px stroke, dual-tone accents,
 * and contextual geometry (no generic weather/antivirus line art).
 */

// 1. Audio & Acoustics: Professional Broadcast Microphone with Acoustic Wavefields
export function SoundMicrophoneIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Mic Capsule */}
      <rect x="9" y="2" width="6" height="10" rx="3" fill="currentColor" fillOpacity="0.12" />
      <line x1="9" y1="5.5" x2="15" y2="5.5" />
      <line x1="9" y1="8" x2="15" y2="8" />
      {/* Shock Mount & U-Bar */}
      <path d="M6 8.5v1.5a6 6 0 0 0 12 0v-1.5" />
      {/* Stand */}
      <line x1="12" y1="16" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
      {/* Acoustic Resonance Waves */}
      <path d="M3.5 8a8.5 8.5 0 0 0 0 4" strokeDasharray="1 2.5" />
      <path d="M20.5 8a8.5 8.5 0 0 1 0 4" strokeDasharray="1 2.5" />
    </svg>
  );
}

// 2. Display & Projection: Ceiling Laser Projector & Widescreen Motorized Display
export function ProjectorScreenIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Motorized Screen Housing */}
      <rect x="2" y="2" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      {/* Screen Surface */}
      <path d="M4 5v10.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5" />
      {/* Screen Content: Presentation Layout */}
      <rect x="6.5" y="7.5" width="5.5" height="4.5" rx="0.75" fill="currentColor" fillOpacity="0.15" />
      <line x1="14" y1="8.5" x2="17.5" y2="8.5" />
      <line x1="14" y1="11" x2="16.5" y2="11" />
      {/* Bottom Weight Bar & Pull Tab */}
      <line x1="3" y1="16.5" x2="21" y2="16.5" />
      <circle cx="12" cy="19" r="1.25" fill="currentColor" />
      <line x1="12" y1="16.5" x2="12" y2="17.75" />
    </svg>
  );
}

// 3. Gigabit Connectivity: Enterprise High-Bandwidth Wi-Fi Signal
export function HighSpeedWifiIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Outer Wave */}
      <path d="M2 7.5C5 4.5 19 4.5 22 7.5" />
      {/* Middle Wave */}
      <path d="M5.5 11C8 8.5 16 8.5 18.5 11" />
      {/* Inner Wave */}
      <path d="M9 14.5C10.5 13 13.5 13 15 14.5" />
      {/* Central High-Speed Signal Node */}
      <circle cx="12" cy="19" r="1.75" fill="currentColor" />
      {/* Gigabit Speed Sparks */}
      <path d="M12 2v2" />
      <path d="M7 3.5l1 1.5" />
      <path d="M17 3.5l-1 1.5" />
    </svg>
  );
}

// 4. Lighting Ambience: Architectural Spotlight Luminaire with Dimmable Rays
export function AdjustableLightingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Ceiling Track */}
      <line x1="2" y1="2" x2="22" y2="2" />
      {/* Track Mount & Swivel Arm */}
      <rect x="10.5" y="2" width="3" height="2" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="6.5" />
      {/* Architectural Spotlight Lamp Head */}
      <path d="M7.5 12.5L9.5 6.5h5l2 6h-9z" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="12" cy="12.5" rx="4.5" ry="1.5" fill="currentColor" fillOpacity="0.25" />
      {/* Controlled Dimmable Ambient Light Rays */}
      <line x1="8" y1="16" x2="5.5" y2="21" strokeDasharray="1.5 2" />
      <line x1="12" y1="15.5" x2="12" y2="22" />
      <line x1="16" y1="16" x2="18.5" y2="21" strokeDasharray="1.5 2" />
    </svg>
  );
}

// 5. Climate Control: Central HVAC Commercial Air Conditioner Cassette
export function AirConditioningIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Main AC Unit Chasis */}
      <rect x="2" y="3.5" width="20" height="8" rx="2" fill="currentColor" fillOpacity="0.12" />
      {/* Front Panel Grid & Filter Slot */}
      <line x1="5" y1="7" x2="19" y2="7" />
      {/* Digital Temp & Status Indicators */}
      <circle cx="17.5" cy="5.5" r="0.75" fill="currentColor" />
      <circle cx="15.5" cy="5.5" r="0.75" fill="currentColor" />
      {/* Air Deflector Louver */}
      <line x1="3.5" y1="11.5" x2="20.5" y2="11.5" />
      {/* Gentle Cooling Airflow Streams */}
      <path d="M5 15.5c1.2 1 2.5 1 3.8 0s2.5-1 3.8 0 2.5 1 3.8 0 2.5-1 3.8 0" />
      <path d="M7 19c1.2 1 2.5 1 3.8 0s2.5-1 3.8 0 2.5 1 3.8 0" />
      <path d="M9 22.5c1 .8 2 .8 3 0s2-.8 3 0" />
    </svg>
  );
}

// 6. Technical Hospitality: Event Coordinator / Concierge Specialist with Headset
export function OnSiteStaffIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Head */}
      <circle cx="12" cy="7" r="3.75" fill="currentColor" fillOpacity="0.15" />
      {/* Headset Arc & Earpiece */}
      <path d="M7.75 7.5a4.25 4.25 0 0 1 8.5 0v1.5" />
      <circle cx="7.75" cy="9" r="1.25" fill="currentColor" />
      {/* Microphone Boom */}
      <path d="M7.75 9.5v2a1.5 1.5 0 0 0 1.5 1.5h1.5" />
      {/* Body & Blazer */}
      <path d="M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2" />
      {/* Event Staff Collar & Tie */}
      <path d="M10 14l2 3.5 2-3.5" />
      <line x1="12" y1="17.5" x2="12" y2="21" />
    </svg>
  );
}

// 7. Modular Ergonomics: Conference Boardroom Table & Executive Chairs
export function TablesSeatingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Conference Table Surface */}
      <rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Center Table Cable Well / Inset */}
      <rect x="8.5" y="10.5" width="7" height="3" rx="0.75" />
      {/* Top Conference Chairs */}
      <rect x="6" y="3" width="3.5" height="3" rx="0.75" fill="currentColor" fillOpacity="0.3" />
      <rect x="14.5" y="3" width="3.5" height="3" rx="0.75" fill="currentColor" fillOpacity="0.3" />
      {/* Bottom Conference Chairs */}
      <rect x="6" y="18" width="3.5" height="3" rx="0.75" fill="currentColor" fillOpacity="0.3" />
      <rect x="14.5" y="18" width="3.5" height="3" rx="0.75" fill="currentColor" fillOpacity="0.3" />
      {/* End Chairs */}
      <rect x="1" y="10" width="2" height="4" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="21" y="10" width="2" height="4" rx="0.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// 8. Access & Safety: High-Tech Security Turnstile & Smart Access Verification
export function BuildingSecurityIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Outer Protective Heraldic Shield */}
      <path d="M12 2l8 3.5v6c0 5-3.5 9-8 10.5C7.5 20.5 4 16.5 4 11.5v-6L12 2z" fill="currentColor" fillOpacity="0.08" />
      {/* Smart Keycard / Biometric Core */}
      <rect x="8.5" y="8" width="7" height="8.5" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      {/* Chip / Sensor */}
      <circle cx="12" cy="11" r="1.5" />
      <line x1="10" y1="14" x2="14" y2="14" />
      {/* Verified Status Tick */}
      <path d="M9.5 18.5l1.5 1.5 3.5-3.5" stroke="#EA8E18" strokeWidth="2" />
    </svg>
  );
}

// 9. Transit & Parking: Reserved VIP Parking Bay & Elevator Lift Access
export function DedicatedParkingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Covered Parking Structure / Canopy */}
      <path d="M2 6h20" />
      <line x1="4" y1="6" x2="4" y2="21" />
      <line x1="20" y1="6" x2="20" y2="21" />
      {/* Reserved 'P' Sign Plaque */}
      <rect x="6.5" y="8.5" width="4.5" height="5.5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <path d="M8 13V9.5h1.75a1 1 0 0 1 0 2H8" />
      {/* VIP Vehicle Silhouette */}
      <path d="M12.5 17.5h7" />
      <path d="M13.5 17.5l1.2-3h3.6l1.2 3" />
      <circle cx="15" cy="18" r="1.25" fill="currentColor" />
      <circle cx="18" cy="18" r="1.25" fill="currentColor" />
    </svg>
  );
}
