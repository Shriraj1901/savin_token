const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = 'your_jwt_secret_here'; // keep this secret and safe
const ENCRYPTION_KEY = crypto.randomBytes(32); // 256-bit key
const IV = crypto.randomBytes(16); // 128-bit IV

// Encrypt function
const encrypt = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV and encrypted string (IV needed for decryption)
  return {
    token: encrypted,
    iv: IV.toString('hex')
  };
};

// Decrypt function
const decrypt = ({ token, iv }) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(token, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  const decoded = jwt.verify(decrypted, JWT_SECRET);
  return decoded;
};

module.exports = {
  encrypt,
  decrypt
};
