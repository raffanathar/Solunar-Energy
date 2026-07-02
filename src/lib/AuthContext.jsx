import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const checkUserAuth = useCallback(async () => {
    const db = globalThis.__B44_DB__
    if (!db) return
    try {
      const u = await db.auth.me()
      setUser(u)
      setIsAuthenticated(!!u)
    } catch {
      setUser(null)
      setIsAuthenticated(false)
    }
    setIsLoadingAuth(false)
    setAuthChecked(true)
  }, [])

  useEffect(() => {
    checkUserAuth()
  }, [checkUserAuth])

  const logout = useCallback((shouldRedirect = true) => {
    const db = globalThis.__B44_DB__
    if (db) db.auth.logout()
    setUser(null)
    setIsAuthenticated(false)
    if (shouldRedirect) window.location.href = '/login'
  }, [])

  const navigateToLogin = useCallback(() => {
    window.location.href = '/login'
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings: null,
      authChecked,
      checkUserAuth,
      logout,
      navigateToLogin,
      checkAppState: async () => {},
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
