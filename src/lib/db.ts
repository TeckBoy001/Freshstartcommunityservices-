import fs from 'fs';
import path from 'path';
import {
  FSCDatabase,
  Program,
  LeadershipProfile,
  Article,
  EventItem,
  FundraisingCampaign,
  Donation,
  Donor,
  Inquiry,
  Volunteer,
  ClientRecord,
  PageContent,
  AdminAccount,
  MediaItem,
} from '@/types/database';
import { INITIAL_DATABASE } from './seed-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'fsc_database.json');

function ensureDatabase(): FSCDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATABASE, null, 2), 'utf-8');
    return INITIAL_DATABASE;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as FSCDatabase;
  } catch (err) {
    console.error('Failed to parse fsc_database.json, falling back to initial seed', err);
    return INITIAL_DATABASE;
  }
}

export function getDatabase(): FSCDatabase {
  return ensureDatabase();
}

export function saveDatabase(db: FSCDatabase): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// --- Organization ---
export function getOrganization() {
  const db = getDatabase();
  return db.organization;
}

export function updateOrganization(org: Partial<FSCDatabase['organization']>) {
  const db = getDatabase();
  db.organization = { ...db.organization, ...org };
  saveDatabase(db);
  return db.organization;
}

// --- Page Content ---
export function getPageContent(): PageContent {
  const db = getDatabase();
  return db.pages;
}

export function updatePageContent(content: Partial<PageContent>): PageContent {
  const db = getDatabase();
  db.pages = { ...db.pages, ...content, updated_at: new Date().toISOString() };
  saveDatabase(db);
  return db.pages;
}

// --- Programs ---
export function getPrograms(onlyPublished = false): Program[] {
  const db = getDatabase();
  let list = db.programs;
  if (onlyPublished) {
    list = list.filter((p) => p.status === 'active' || p.status === 'ongoing');
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export function getProgramBySlug(slug: string): Program | undefined {
  const db = getDatabase();
  return db.programs.find((p) => p.slug === slug);
}

export function saveProgram(program: Partial<Program> & { title: string }): Program {
  const db = getDatabase();
  const now = new Date().toISOString();
  const slug =
    program.slug ||
    program.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const existingIndex = db.programs.findIndex((p) => p.id === program.id);

  if (existingIndex >= 0) {
    const updated: Program = {
      ...db.programs[existingIndex],
      ...program,
      slug,
      updated_at: now,
    };
    db.programs[existingIndex] = updated;
    saveDatabase(db);
    return updated;
  } else {
    const newProgram: Program = {
      id: program.id || `prog-${Date.now()}`,
      slug,
      title: program.title,
      category: program.category || 'Workshops',
      description_short: program.description_short || '',
      description_full: program.description_full || '',
      target_population: program.target_population || 'Community members',
      status: program.status || 'active',
      image_url:
        program.image_url ||
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
      is_featured: program.is_featured ?? false,
      display_order: program.display_order || db.programs.length + 1,
      created_at: now,
      updated_at: now,
    };
    db.programs.push(newProgram);
    saveDatabase(db);
    return newProgram;
  }
}

export function deleteProgram(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.programs.length;
  db.programs = db.programs.filter((p) => p.id !== id);
  if (db.programs.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Leadership Profiles ---
export function getLeadership(onlyPublished = false): LeadershipProfile[] {
  const db = getDatabase();
  let list = db.leadership;
  if (onlyPublished) {
    list = list.filter((l) => l.published);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export function saveLeadership(leader: Partial<LeadershipProfile> & { name: string; title: string }): LeadershipProfile {
  const db = getDatabase();
  const now = new Date().toISOString();
  const existingIndex = db.leadership.findIndex((l) => l.id === leader.id);

  if (existingIndex >= 0) {
    const updated: LeadershipProfile = {
      ...db.leadership[existingIndex],
      ...leader,
      updated_at: now,
    };
    db.leadership[existingIndex] = updated;
    saveDatabase(db);
    return updated;
  } else {
    const newLeader: LeadershipProfile = {
      id: leader.id || `lead-${Date.now()}`,
      name: leader.name,
      title: leader.title,
      role_type: leader.role_type || 'director',
      bio_short: leader.bio_short || '',
      bio_full: leader.bio_full || '',
      credentials: leader.credentials,
      image_url:
        leader.image_url ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      display_order: leader.display_order || db.leadership.length + 1,
      published: leader.published ?? true,
      created_at: now,
      updated_at: now,
    };
    db.leadership.push(newLeader);
    saveDatabase(db);
    return newLeader;
  }
}

export function deleteLeadership(id: string): boolean {
  const db = getDatabase();
  const prevLen = db.leadership.length;
  db.leadership = db.leadership.filter((l) => l.id !== id);
  if (db.leadership.length !== prevLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Articles (News & Blog) ---
export function getArticles(onlyPublished = false): Article[] {
  const db = getDatabase();
  let list = db.articles;
  if (onlyPublished) {
    list = list.filter((a) => a.status === 'published');
  }
  return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const db = getDatabase();
  return db.articles.find((a) => a.slug === slug);
}

export function saveArticle(article: Partial<Article> & { title: string }): Article {
  const db = getDatabase();
  const now = new Date().toISOString();
  const slug =
    article.slug ||
    article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const existingIndex = db.articles.findIndex((a) => a.id === article.id);

  if (existingIndex >= 0) {
    const updated: Article = {
      ...db.articles[existingIndex],
      ...article,
      slug,
      updated_at: now,
      published_at:
        article.status === 'published' && !db.articles[existingIndex].published_at
          ? now
          : db.articles[existingIndex].published_at,
    };
    db.articles[existingIndex] = updated;
    saveDatabase(db);
    return updated;
  } else {
    const newArt: Article = {
      id: article.id || `art-${Date.now()}`,
      slug,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || 'Organization News',
      author_name: article.author_name || 'Fresh Start Team',
      featured_image:
        article.featured_image ||
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      status: article.status || 'draft',
      published_at: article.status === 'published' ? now : undefined,
      created_at: now,
      updated_at: now,
    };
    db.articles.push(newArt);
    saveDatabase(db);
    return newArt;
  }
}

export function deleteArticle(id: string): boolean {
  const db = getDatabase();
  const prevLen = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== prevLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Events ---
export function getEvents(status?: 'upcoming' | 'completed' | 'cancelled'): EventItem[] {
  const db = getDatabase();
  let list = db.events;
  if (status) {
    list = list.filter((e) => e.status === status);
  }
  return list.sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
}

export function saveEvent(event: Partial<EventItem> & { title: string }): EventItem {
  const db = getDatabase();
  const now = new Date().toISOString();
  const slug =
    event.slug ||
    event.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const existingIndex = db.events.findIndex((e) => e.id === event.id);

  if (existingIndex >= 0) {
    const updated: EventItem = {
      ...db.events[existingIndex],
      ...event,
      slug,
      updated_at: now,
    };
    db.events[existingIndex] = updated;
    saveDatabase(db);
    return updated;
  } else {
    const newEvt: EventItem = {
      id: event.id || `evt-${Date.now()}`,
      slug,
      title: event.title,
      description: event.description || '',
      date_time: event.date_time || now,
      location: event.location || 'FSC Community Center',
      category: event.category || 'Special Event',
      image_url:
        event.image_url ||
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      status: event.status || 'upcoming',
      rsvp_link: event.rsvp_link || '/contact',
      created_at: now,
      updated_at: now,
    };
    db.events.push(newEvt);
    saveDatabase(db);
    return newEvt;
  }
}

export function deleteEvent(id: string): boolean {
  const db = getDatabase();
  const prevLen = db.events.length;
  db.events = db.events.filter((e) => e.id !== id);
  if (db.events.length !== prevLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Campaigns ---
export function getCampaigns(activeOnly = false): FundraisingCampaign[] {
  const db = getDatabase();
  let list = db.campaigns;
  if (activeOnly) {
    list = list.filter((c) => c.status === 'active');
  }
  return list;
}

export function saveCampaign(campaign: Partial<FundraisingCampaign> & { name: string; target_goal: number }): FundraisingCampaign {
  const db = getDatabase();
  const now = new Date().toISOString();
  const slug =
    campaign.slug ||
    campaign.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const existingIndex = db.campaigns.findIndex((c) => c.id === campaign.id);

  if (existingIndex >= 0) {
    const updated: FundraisingCampaign = {
      ...db.campaigns[existingIndex],
      ...campaign,
      slug,
      updated_at: now,
    };
    db.campaigns[existingIndex] = updated;
    saveDatabase(db);
    return updated;
  } else {
    const newCamp: FundraisingCampaign = {
      id: campaign.id || `camp-${Date.now()}`,
      name: campaign.name,
      slug,
      description: campaign.description || '',
      target_goal: campaign.target_goal,
      amount_raised: 0,
      start_date: campaign.start_date || now.split('T')[0],
      end_date: campaign.end_date,
      status: campaign.status || 'active',
      is_featured: campaign.is_featured ?? true,
      created_at: now,
      updated_at: now,
    };
    db.campaigns.push(newCamp);
    saveDatabase(db);
    return newCamp;
  }
}

// --- Donations & Donors ---
export function getDonations(filters?: {
  campaign_id?: string;
  status?: string;
  search?: string;
}): Donation[] {
  const db = getDatabase();
  let list = db.donations;

  if (filters?.campaign_id) {
    list = list.filter((d) => d.campaign_id === filters.campaign_id);
  }
  if (filters?.status) {
    list = list.filter((d) => d.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (d) =>
        d.donor_name.toLowerCase().includes(q) ||
        d.donor_email.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function recordDonation(donation: {
  amount: number;
  donor_name: string;
  donor_email: string;
  donor_type?: Donor['donor_type'];
  campaign_id?: string;
  payment_method?: Donation['payment_method'];
  payment_processor_ref?: string;
  frequency?: Donation['frequency'];
  notes?: string;
  phone?: string;
  mailing_address?: string;
  status?: Donation['status'];
}): Donation {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Find or create donor
  let donor = db.donors.find((d) => d.email.toLowerCase() === donation.donor_email.toLowerCase());
  const nameParts = donation.donor_name.trim().split(' ');
  const firstName = nameParts[0] || 'Friend of';
  const lastName = nameParts.slice(1).join(' ') || 'FSC';

  if (!donor) {
    donor = {
      id: `donor-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      first_name: firstName,
      last_name: lastName,
      email: donation.donor_email,
      phone: donation.phone,
      mailing_address: donation.mailing_address,
      donor_type: donation.donor_type || 'individual',
      total_donated: donation.amount,
      donations_count: 1,
      created_at: now,
      updated_at: now,
    };
    db.donors.push(donor);
  } else {
    donor.total_donated += donation.amount;
    donor.donations_count += 1;
    donor.updated_at = now;
    if (donation.phone) donor.phone = donation.phone;
    if (donation.mailing_address) donor.mailing_address = donation.mailing_address;
  }

  // Campaign lookup & update amount raised
  let campaignName = 'General Community Hope Fund';
  if (donation.campaign_id) {
    const campaign = db.campaigns.find((c) => c.id === donation.campaign_id);
    if (campaign) {
      campaignName = campaign.name;
      if (donation.status === 'completed' || !donation.status) {
        campaign.amount_raised += donation.amount;
        campaign.updated_at = now;
      }
    }
  }

  const newDonation: Donation = {
    id: `don-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    donor_id: donor.id,
    donor_name: donation.donor_name,
    donor_email: donation.donor_email,
    campaign_id: donation.campaign_id,
    campaign_name: campaignName,
    amount: donation.amount,
    currency: 'USD',
    frequency: donation.frequency || 'one-time',
    payment_method: donation.payment_method || 'card',
    payment_processor_ref: donation.payment_processor_ref || `mock_ref_${Date.now()}`,
    status: donation.status || 'completed',
    receipt_sent: true,
    notes: donation.notes,
    created_at: now,
  };

  db.donations.push(newDonation);
  saveDatabase(db);
  return newDonation;
}

export function getDonors(search?: string): Donor[] {
  const db = getDatabase();
  let list = db.donors;
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (d) =>
        d.first_name.toLowerCase().includes(q) ||
        d.last_name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q)
    );
  }
  return list.sort((a, b) => b.total_donated - a.total_donated);
}

// --- Inquiries & Volunteers ---
export function getInquiries(): Inquiry[] {
  const db = getDatabase();
  return db.inquiries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function recordInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>): Inquiry {
  const db = getDatabase();
  const newInq: Inquiry = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    status: 'new',
    created_at: new Date().toISOString(),
  };
  db.inquiries.push(newInq);
  saveDatabase(db);
  return newInq;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): boolean {
  const db = getDatabase();
  const inq = db.inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    saveDatabase(db);
    return true;
  }
  return false;
}

export function getVolunteers(): Volunteer[] {
  const db = getDatabase();
  return db.volunteers;
}

export function recordVolunteer(volunteer: Omit<Volunteer, 'id' | 'hours_logged' | 'status' | 'created_at'>): Volunteer {
  const db = getDatabase();
  const newVol: Volunteer = {
    id: `vol-${Date.now()}`,
    ...volunteer,
    hours_logged: 0,
    status: 'applicant',
    created_at: new Date().toISOString(),
  };
  db.volunteers.push(newVol);
  saveDatabase(db);
  return newVol;
}

// --- Internal Client Records (Confidential Case Management) ---
export function getClients(): ClientRecord[] {
  const db = getDatabase();
  return db.clients;
}

export function recordClient(client: Omit<ClientRecord, 'id' | 'created_at' | 'updated_at'>): ClientRecord {
  const db = getDatabase();
  const now = new Date().toISOString();
  const newCli: ClientRecord = {
    id: `cli-${Date.now()}`,
    ...client,
    created_at: now,
    updated_at: now,
  };
  db.clients.push(newCli);
  saveDatabase(db);
  return newCli;
}

// --- Media Library ---
export function getMedia(): MediaItem[] {
  const db = getDatabase();
  return db.media;
}

export function saveMedia(item: Omit<MediaItem, 'id' | 'uploaded_at'>): MediaItem {
  const db = getDatabase();
  const newItem: MediaItem = {
    id: `med-${Date.now()}`,
    ...item,
    uploaded_at: new Date().toISOString(),
  };
  db.media.push(newItem);
  saveDatabase(db);
  return newItem;
}

export function deleteMedia(id: string): boolean {
  const db = getDatabase();
  const prevLen = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== prevLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Impact Stats (Calculated directly from live database records) ---
export function getImpactMetrics() {
  const db = getDatabase();
  const confirmedDonations = db.donations.filter((d) => d.status === 'completed');
  const totalRaised = confirmedDonations.reduce((sum, d) => sum + d.amount, 0);

  return {
    totalRaised,
    donationsCount: confirmedDonations.length,
    totalDonors: db.donors.length,
    activePrograms: db.programs.filter((p) => p.status === 'active').length,
    activeCampaigns: db.campaigns.filter((c) => c.status === 'active').length,
    publishedArticles: db.articles.filter((a) => a.status === 'published').length,
    upcomingEvents: db.events.filter((e) => e.status === 'upcoming').length,
    volunteersCount: db.volunteers.length,
    familiesServed: db.pages.impact_families_served,
    mealsProvided: db.pages.impact_meals_provided,
  };
}
