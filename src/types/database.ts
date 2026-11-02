export type Role = 'super_admin' | 'content_admin' | 'fundraising_admin' | 'program_admin';

export interface AdminAccount {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: Role;
  created_at: string;
  last_login?: string;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  abbreviation: string;
  domain: string;
  mission: string;
  vision: string;
  phone: string;
  email: string;
  address: string;
  ein: string;
  tax_status_note: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  role_type: 'executive' | 'board' | 'director' | 'staff';
  bio_short: string;
  bio_full: string;
  credentials?: string;
  image_url: string;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: 'Workshops' | 'Community Care' | 'Inspirational' | 'Empowerment' | 'Support';
  description_short: string;
  description_full: string;
  target_population: string;
  status: 'active' | 'upcoming' | 'ongoing';
  image_url: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category:
    | 'Organization News'
    | 'Community Stories'
    | 'Program Updates'
    | 'Events'
    | 'Volunteer Opportunities'
    | 'Fundraising News'
    | 'Announcements';
  author_name: string;
  featured_image: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  date_time: string;
  location: string;
  category: 'Workshop' | 'Food Distribution' | 'Fundraiser' | 'Community Meeting' | 'Special Event';
  image_url: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  rsvp_link?: string;
  attendees_count?: number;
  funds_raised?: number;
  created_at: string;
  updated_at: string;
}

export interface FundraisingCampaign {
  id: string;
  name: string;
  slug: string;
  description: string;
  target_goal: number;
  amount_raised: number;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'draft';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Donor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  mailing_address?: string;
  donor_type: 'individual' | 'business' | 'church' | 'foundation';
  total_donated: number;
  donations_count: number;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  donor_name: string;
  donor_email: string;
  campaign_id?: string;
  campaign_name?: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly' | 'annual';
  payment_method: 'card' | 'ach' | 'check' | 'cash';
  payment_processor_ref?: string;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  receipt_sent: boolean;
  notes?: string;
  created_at: string;
}

export interface ClientRecord {
  id: string;
  client_code: string;
  program_id: string;
  intake_date: string;
  status: 'active' | 'completed' | 'referred';
  case_worker: string;
  restricted_notes: string;
  created_at: string;
  updated_at: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  availability: string;
  hours_logged: number;
  status: 'applicant' | 'active' | 'inactive';
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  type: 'general' | 'volunteer' | 'partnership' | 'program_referral';
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  created_at: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt_text: string;
  caption?: string;
  size_bytes: number;
  mime_type: string;
  uploaded_at: string;
}

export interface PageContent {
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  mission_display_title: string;
  vision_display_title: string;
  impact_families_served: number;
  impact_programs_count: number;
  impact_meals_provided: number;
  impact_volunteers_count: number;
  updated_at: string;
}

export interface FSCDatabase {
  organization: OrganizationProfile;
  leadership: LeadershipProfile[];
  programs: Program[];
  articles: Article[];
  events: EventItem[];
  campaigns: FundraisingCampaign[];
  donors: Donor[];
  donations: Donation[];
  clients: ClientRecord[];
  volunteers: Volunteer[];
  inquiries: Inquiry[];
  media: MediaItem[];
  pages: PageContent;
  admins: AdminAccount[];
}
