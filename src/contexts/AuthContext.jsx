import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from '../lib/auth';
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from '../hooks/useAuthMutations';
import { queryKeys } from '../lib/queryKeys';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const registerMutation = useRegisterMutation();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: fetchCurrentUser,
    retry: false,
  });

  const fetchUser = async () => {
    const result = await refetch();
    return result.data || null;
  };

  const login = async (email, password) => {
    await loginMutation.mutateAsync({ email, password });
    await fetchUser();
  };

  const register = async (firstName, lastName, email, phone, countryCode, password) => {
    return registerMutation.mutateAsync({
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      password,
    });
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      queryClient.setQueryData(queryKeys.auth.user, null);
      navigate('/', { replace: true });
    }
  };

  const value = {
    currentUser: isError ? null : user || null,
    fetchUser,
    logout,
    login,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
