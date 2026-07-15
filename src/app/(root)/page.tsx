'use client';

import { useEffect } from 'react';

export default function RootRedirect() {
  useEffect(() => {
    // Basic client-side redirect to /en
    window.location.replace('/en');
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      Redirecting...
    </div>
  );
}
