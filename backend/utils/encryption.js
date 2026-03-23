const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';

// We use a predefined 32-byte key if one is not provided in the environment.
// For production, ALWAYS set ENCRYPTION_KEY in .env (64 hex characters)
const getEncryptionKey = () => {
    if (process.env.ENCRYPTION_KEY) {
        return Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    }
    return crypto.scryptSync('passify-secret-key-fallback', 'salt', 32);
};

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted,
        authTag: authTag.toString('hex')
    };
};

const decrypt = (encryptedData, ivHex, authTagHex) => {
    const decipher = crypto.createDecipheriv(ALGORITHM, getEncryptionKey(), Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};

module.exports = { encrypt, decrypt };
