import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database functions
export const contributions = {
  async getAll(status: 'approved' | 'pending' | 'rejected' | 'all' = 'approved') {
    let query = supabase
      .from('contributions')
      .select('*, users(email)')
      .order('created_at', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('contributions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(contribution: any) {
    const { data, error } = await supabase
      .from('contributions')
      .insert(contribution)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: string, adminNote?: string) {
    const { data, error } = await supabase
      .from('contributions')
      .update({ 
        status,
        admin_note: adminNote || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contributions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// User roles - in production, you'd have a profiles table
export const userRoles = {
  async isAdmin(_userId: string): Promise<boolean> {
    // For demo, check if email is admin
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email === 'admin@hapoeltlv.fan' || user?.email === 'shay@example.com';
  }
};
