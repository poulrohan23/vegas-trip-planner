-- Run this SQL in your Neon database console to create the required tables
-- Go to: console.neon.tech -> Your Project -> SQL Editor

-- Table for itinerary
CREATE TABLE IF NOT EXISTS itinerary (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table for travelers
CREATE TABLE IF NOT EXISTS travelers (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table for rental info
CREATE TABLE IF NOT EXISTS rental (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table for important notes
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table for accommodations
CREATE TABLE IF NOT EXISTS accommodations (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table for crew checklist
CREATE TABLE IF NOT EXISTS crew_checklist (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial empty data
INSERT INTO itinerary (id, data) VALUES (1, '[]'::jsonb) ON CONFLICT (id) DO NOTHING;
INSERT INTO travelers (id, data) VALUES (1, '[]'::jsonb) ON CONFLICT (id) DO NOTHING;
INSERT INTO rental (id, data) VALUES (1, '{"company":"","conf":"","pickup":""}'::jsonb) ON CONFLICT (id) DO NOTHING;
INSERT INTO notes (id, data) VALUES (1, '[]'::jsonb) ON CONFLICT (id) DO NOTHING;
INSERT INTO accommodations (id, data) VALUES (1, '{"las":{"name":"","address":"","notes":""},"los":{"name":"","address":"","notes":""},"san":{"name":"","address":"","notes":""}}'::jsonb) ON CONFLICT (id) DO NOTHING;
INSERT INTO crew_checklist (id, data) VALUES (1, '[]'::jsonb) ON CONFLICT (id) DO NOTHING;

-- Grant permissions for REST API access (if needed)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO neon_superuser;
