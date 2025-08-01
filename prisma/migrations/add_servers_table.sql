-- Migration: Add servers table
-- Created at: 2024-12-24

CREATE TABLE IF NOT EXISTS "servers" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT DEFAULT NULL,
  "host_url" TEXT NOT NULL,
  "status" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample data (optional)
INSERT INTO "servers" ("username", "host_url", "status") VALUES
  ('admin_user', 'https://server1.moonspace.com', 1),
  ('manager_01', 'https://server2.moonspace.com', 1),
  ('operator_03', 'https://server3.moonspace.com', 1),
  ('support_team', 'https://server4.moonspace.com', 0),
  (NULL, 'https://staging.moonspace.com', 1);