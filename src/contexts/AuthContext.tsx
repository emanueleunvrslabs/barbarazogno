import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

interface Studio {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  role: string;
  studio_id: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  studio: Studio | null;
  userRole: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [studio, setStudio] = useState<Studio | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileData) {
        setProfile(profileData as unknown as Profile);
      }

      // Fetch role (to get studio_id)
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role, studio_id')
        .eq('user_id', userId)
        .limit(1)
        .single();

      if (roleData) {
        setUserRole(roleData as unknown as UserRole);

        // Fetch studio
        const { data: studioData } = await supabase
          .from('studios')
          .select('*')
          .eq('id', (roleData as unknown as UserRole).studio_id)
          .single();

        if (studioData) {
          setStudio(studioData as unknown as Studio);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to avoid potential deadlock with Supabase client
          setTimeout(() => fetchUserData(session.user.id), 0);
        } else {
          setProfile(null);
          setStudio(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setStudio(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        studio,
        userRole,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
