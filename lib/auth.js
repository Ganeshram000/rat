import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'neevsaathi_super_secure_jwt_secret_jaipur_construction_2025';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const AUTH_FILE = path.join(process.cwd(), 'data', 'auth.json');

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@neevsaathi.com',
  name: 'NeevSaathi Admin',
  role: 'superadmin',
  // bcrypt hash for "NeevSaathi@2025"
  passwordHash: '$2a$10$WpkmB6k62vS315KzN8N8y.7nC5e98w904D024oO7x6eYg5JkUeK7C'
};

function getStoredAdmin() {
  try {
    if (!fs.existsSync(AUTH_FILE)) {
      const defaultHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'NeevSaathi@2025', 10);
      const initial = { ...DEFAULT_ADMIN, passwordHash: defaultHash };
      fs.writeFileSync(AUTH_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(AUTH_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading auth file:', error);
    return DEFAULT_ADMIN;
  }
}

export function updateAdminPassword(newPassword) {
  const current = getStoredAdmin();
  const newHash = bcrypt.hashSync(newPassword, 10);
  const updated = { ...current, passwordHash: newHash, updatedAt: new Date().toISOString() };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return true;
}

export function updateAdminProfile(name, email) {
  const current = getStoredAdmin();
  const updated = { ...current, name: name || current.name, email: email || current.email, updatedAt: new Date().toISOString() };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

export async function verifyCredentials(email, password) {
  const admin = getStoredAdmin();
  if (email.toLowerCase().trim() !== admin.email.toLowerCase().trim()) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return null;
  }
  return {
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}

export async function createSessionToken(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  return token;
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function getSessionFromRequest(request) {
  try {
    let token = null;
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/neevsaathi_token=([^;]+)/);
    if (match) {
      token = match[1];
    }
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }
    if (!token) return null;
    return await verifySessionToken(token);
  } catch (e) {
    return null;
  }
}
