'use client';
import { useEffect } from 'react';

// Pings the Render API every 14 minutes to prevent it from sleeping
export default function KeepAlive() {
  useEffect(() => {
    const ping = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://learnshare-api.onrender.com'}/api/health`)
        .catch(() => {}); // silently ignore errors
    };

    // Ping immediately on load to wake up Render
    ping();

    // Then ping every 14 minutes
    const interval = setInterval(ping, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
