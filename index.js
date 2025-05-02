const { encrypt, decrypt } = require('./script');

const payload = { userId: 101, role: 'admin' };

// Encrypt the JWT token
const encryptedData = encrypt(payload);
console.log('Encrypted Token:', encryptedData);

// Decrypt and verify
const decodedPayload = decrypt(encryptedData);
console.log('Decoded Payload:', decodedPayload);
