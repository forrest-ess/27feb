const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false; // Avoid SSR issues

  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decoded.exp > currentTime; // True if not expired
};

export const logout = () => {
  localStorage.removeItem('token');
  return true; // Indicate logout occurred
};

export const getTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (!token) return 0;

  const decoded = decodeToken(token);
  return decoded?.exp ? decoded.exp * 1000 : 0; // Return expiration in milliseconds
};
