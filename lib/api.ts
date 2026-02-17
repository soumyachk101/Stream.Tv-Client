const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://stream-tv-server-liart.vercel.app' : 'http://localhost:5000');

if (typeof window !== 'undefined') {
  console.log('🔌 API Base URL:', API_URL);

  if (window.location.hostname !== 'localhost' && API_URL.includes('localhost')) {
    console.warn(
      '⚠️ WARNING: You are using localhost API URL in a production environment!',
      'Please set NEXT_PUBLIC_API_URL in your deployment settings.'
    );
  }
}

export const API_BASE = API_URL;
