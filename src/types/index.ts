export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Contribution {
  id: string;
  user_id: string;
  type: 'story' | 'correction' | 'title' | 'legend' | 'season' | 'event';
  title: string;
  content: string;
  year?: number;
  source_url?: string;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_note?: string;
  created_at: string;
  users?: {
    email: string;
  };
}

export interface ContributionFormData {
  type: Contribution['type'];
  title: string;
  content: string;
  year?: number;
  source_url?: string;
  image_url?: string;
}
