// AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (newUser, callback) => {
    setUser(newUser);
    if(callback) callback();
  };

  const signOut = (callback) => {
    setUser(null);
    if(callback) callback();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
