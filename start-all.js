import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
