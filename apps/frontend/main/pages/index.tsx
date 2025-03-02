import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { logout } from '../libs/auth';

export default function Home() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(
        atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      const expTime = decoded.exp * 1000; // Convert to milliseconds
      const updateTimeLeft = () => {
        const now = Date.now();
        const remaining = expTime - now;
        setTimeLeft(remaining > 0 ? remaining : 0);
      };
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000); // Update every second
      return () => clearInterval(interval);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to the App</h1>
        <p className="mt-4">You are logged in!</p>
        {timeLeft !== null && (
          <p className="mt-2">
            Session expires in: {Math.floor(timeLeft / 1000)} seconds
          </p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
