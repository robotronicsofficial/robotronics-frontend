import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchSessionJson,
  sendJson,
  sendSessionJson,
} from '../lib/api';
import { clearActiveChildSession } from '../utils/childSessionRequest';
import { AuthContext } from './authContext';

const AUTH_USER_PATH = '/auth/user';
const AUTH_LOGIN_PATH = '/auth/login';
const AUTH_REGISTER_PATH = '/auth/register';
const AUTH_LOGOUT_PATH = '/auth/logout';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await fetchSessionJson(AUTH_USER_PATH);
      setCurrentUser(data);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    await sendSessionJson(AUTH_LOGIN_PATH, {
      method: 'POST',
      body: { email, password },
    });

    await fetchUser();
  };

  const register = async (firstName, lastName, email, phone, countryCode, password) => {
    return sendJson(AUTH_REGISTER_PATH, {
      method: 'POST',
      body: {
        firstName,
        lastName,
        email,
        phone,
        countryCode,
        password,
      },
    });
  };

  const logout = async () => {
    try {
      await sendSessionJson(AUTH_LOGOUT_PATH, { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearActiveChildSession();
      setCurrentUser(null);
      navigate('/', { replace: true });
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
