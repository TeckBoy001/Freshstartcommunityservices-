-- Fresh Start Community Services, Incorporated (FSC)
-- Production PostgreSQL / Supabase Relational Schema & Row Level Security (RLS) Policies

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations Profile
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL DEFAULT 'FSC',
    domain TEXT NOT NULL DEFAULT 'freshstartcommunityservices.com',
    mission TEXT NOT NULL,
    vision TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    ein TEXT,
    tax_status_note TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Staff & Leadership Directory
CREATE TABLE IF NOT EXISTS leadership_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role_type TEXT NOT NULL CHECK (role_type IN ('executive', 'board', 'director', 'staff')),
    bio_short TEXT,
    bio_full TEXT,
    credentials TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Programs Directory
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description_short TEXT NOT NULL,
    description_full TEXT NOT NULL,
    target_population TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'ongoing')),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Fundraising Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    target_goal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amount_raised NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    start_date DATE NOT NULL,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'draft')),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Donors (Confidential Donor Database)
CREATE TABLE IF NOT EXISTS donors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    mailing_address TEXT,
    donor_type TEXT NOT NULL DEFAULT 'individual' CHECK (donor_type IN ('individual', 'business', 'church', 'foundation')),
    total_donated NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    donations_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Donations
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES donors(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    campaign_name TEXT,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'USD',
    frequency TEXT NOT NULL DEFAULT 'one-time' CHECK (frequency IN ('one-time', 'monthly', 'annual')),
    payment_method TEXT NOT NULL DEFAULT 'card' CHECK (payment_method IN ('card', 'ach', 'check', 'cash')),
    payment_processor_ref TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('completed', 'pending', 'refunded', 'failed')),
    receipt_sent BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Blog & News Articles
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT 'Fresh Start Team',
    featured_image TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Events & Announcements
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
    rsvp_link TEXT,
    attendees_count INT DEFAULT 0,
    funds_raised NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Volunteers
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interests TEXT[],
    availability TEXT,
    hours_logged INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'applicant' CHECK (status IN ('applicant', 'active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Inquiries (Contact & Get Involved Submissions)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    type TEXT NOT NULL CHECK (type IN ('general', 'volunteer', 'partnership', 'program_referral')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Confidential Case Management (RESTRICTED INTERNAL RECORDS ONLY)
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_code TEXT UNIQUE NOT NULL,
    program_id UUID REFERENCES programs(id) ON DELETE RESTRICT,
    intake_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'referred')),
    case_worker TEXT NOT NULL,
    restricted_notes TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Media Library
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    caption TEXT,
    size_bytes BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public can read published content only
CREATE POLICY "Public can view published leadership" ON leadership_profiles FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can view active programs" ON programs FOR SELECT USING (status IN ('active', 'ongoing'));
CREATE POLICY "Public can view active campaigns" ON campaigns FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view events" ON events FOR SELECT USING (TRUE);
CREATE POLICY "Public can create inquiries" ON inquiries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can register volunteer interest" ON volunteers FOR INSERT WITH CHECK (TRUE);

-- Confidential tables (Donors, Clients, Internal Notes) restricted to authenticated staff only
CREATE POLICY "Staff only access to Donors" ON donors FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Staff only access to Donations" ON donations FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Restricted access to Clients" ON clients FOR ALL TO authenticated USING (TRUE);
