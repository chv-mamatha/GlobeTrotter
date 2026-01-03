-- Run this in pgAdmin as postgres user to create the backend user

-- Create user for backend
CREATE USER globetrotter_user WITH PASSWORD 'globetrotter_pass_2024';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE globetrotter_db TO globetrotter_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO globetrotter_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO globetrotter_user;

-- Allow user to create tables
ALTER USER globetrotter_user CREATEDB;