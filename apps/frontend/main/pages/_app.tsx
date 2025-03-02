import { AppProps } from 'next/app';
import './styles.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated, getTokenExpiration, logout } from '../libs/auth';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Skip check for auth pages
    const isAuthPage =
      router.pathname === '/auth/login' || router.pathname === '/auth/register';
    if (isAuthPage) return;

    // Initial check
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    // Set up timeout for token expiration
    const expTime = getTokenExpiration();
    if (expTime > 0) {
      const now = Date.now();
      const timeUntilExpiry = expTime - now;

      if (timeUntilExpiry <= 0) {
        // Token already expired
        logout();
        router.push('/auth/login');
      } else {
        // Set timeout to log out when token expires
        const timeout = setTimeout(() => {
          logout();
          router.push('/auth/login');
        }, timeUntilExpiry);

        // Cleanup timeout on unmount or navigation
        return () => clearTimeout(timeout);
      }
    }
  }, [router.pathname]); // Re-run on page change

  return <Component {...pageProps} />;
}

export default MyApp;
