
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Organization, AuthContextType } from '../types';
import { supabase } from './supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
          const userOrgs = await supabase.organizations.list();
          setOrgs(userOrgs);
          // Set first org as default if none selected
          if (userOrgs.length > 0) setActiveOrg(userOrgs[0]);
        }
      } catch (err) {
        console.error("Auth init failed", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const signIn = async (email: string) => {
    setLoading(true);
    // Real logic would use supabase.auth.signInWithPassword
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    const userOrgs = await supabase.organizations.list();
    if (userOrgs.length > 0) setActiveOrg(userOrgs[0]);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setActiveOrg(null);
  };

  const switchOrg = (org: Organization) => {
    setActiveOrg(org);
  };

  return (
    <AuthContext.Provider value={{ user, loading, activeOrg, signIn, signOut, switchOrg }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
