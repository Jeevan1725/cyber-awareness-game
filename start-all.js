import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env variables into process.env manually
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split(/\r?\n/).forEach(line => {
      if (!line || line.trim().startsWith('#')) return;
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        value = value.trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
  }
} catch (err) {
  console.warn('Warning: Could not load .env file:', err.message);
}

console.log('Starting Cyberverse Awareness Game Platform...');

// 1. Start Backend Server
const backend = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => {
  console.error('Failed to start backend server:', err);
});

// 2. Start Frontend Dev Server
const frontend = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true
});

frontend.on('error', (err) => {
  console.error('Failed to start frontend server:', err);
});

// Wait 3 seconds for Vite to initialize, then start the tunnel
setTimeout(() => {
  console.log('\nStarting Public Tunnel via Pinggy...');
  const tunnel = spawn('ssh', ['-p', '80', '-R0:localhost:5173', '-o', 'StrictHostKeyChecking=no', 'qr@a.pinggy.io'], {
    stdio: 'inherit',
    shell: true
  });

  tunnel.on('error', (err) => {
    console.error('Failed to start tunnel:', err);
  });
}, 3000);
