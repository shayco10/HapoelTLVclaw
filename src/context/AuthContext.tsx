import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';
import { auth } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user as User);
        checkAdmin(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    try {
      const session = await auth.getSession();
      if (session?.user) {
        setUser(session.user as User);
        await checkAdmin(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function checkAdmin(_userId: string) {
    try {
      const user = await auth.getUser();
      // For demo: admin is any email containing 'admin' or specific emails
      const adminEmails = ['admin@hapoeltlv.fan', 'shay@example.com'];
      const isAdminUser = user?.email && adminEmails.includes(user.email);
      setIsAdmin(isAdminUser || false);
    } catch (error) {
      setIsAdmin(false);
    }
  }

  async function signIn(email: string, password: string) {
    const { user } = await auth.signIn(email, password);
    setUser(user as User);
    await checkAdmin(user!.id);
  }

  async function signUp(email: string, password: string) {
    const { user } = await auth.signUp(email, password);
    setUser(user as User);
  }

  async function signOut() {
    await auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
