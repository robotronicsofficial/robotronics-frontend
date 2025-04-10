import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/user', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      setCurrentUser(data);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      await fetchUser();
    } catch (err) {
      throw err;
    }
  };

  const register = async (firstName, lastName, email, phone, countryCode, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          countryCode,
          password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      await fetchUser();
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setCurrentUser(null);
      window.location.href = '/';
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    currentUser,
    fetchUser,
    logout,
    login,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}