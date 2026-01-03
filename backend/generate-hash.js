const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 12);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nSQL to update users:');
  console.log(`UPDATE users SET password_hash = '${hash}' WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'alex.chen@example.com', 'priya.patel@example.com', 'demo@globetrotter.com');`);
}

generateHash();