const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    site: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String, // Encrypted password string
        required: true,
    },
    iv: {
        type: String, // Initialization vector for decryption
        required: true,
    },
    authTag: {
        type: String, // Authentication tag for AES-256-GCM
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);
