-- Update sample users with proper password hashes for 'password123'
-- Run this after creating the users table

UPDATE users SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzxqEyy' 
WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'alex.chen@example.com', 'priya.patel@example.com', 'demo@globetrotter.com');

-- This hash corresponds to password: 'password123'
-- Users can now login with:
-- Email: demo@globetrotter.com, Password: password123