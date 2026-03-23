const express = require('express');
const z = require('zod');
const Password = require('../models/Password');
const { encrypt, decrypt } = require('../utils/encryption');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

const passwordSchema = z.object({
    site: z.string().min(1, 'Site is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

router.get('/', async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user._id });

        const decryptedPasswords = passwords.map(item => {
            let clearTextPassword = '';
            try {
                clearTextPassword = decrypt(item.password, item.iv, item.authTag);
            } catch (e) {
                clearTextPassword = 'ERROR_DECRYPTING';
            }

            return {
                _id: item._id,
                site: item.site,
                username: item.username,
                password: clearTextPassword,
                createdAt: item.createdAt,
            };
        });

        res.json(decryptedPasswords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { site, username, password } = passwordSchema.parse(req.body);
        const { iv, encryptedData, authTag } = encrypt(password);

        const newPassword = await Password.create({
            user: req.user._id,
            site,
            username,
            password: encryptedData,
            iv,
            authTag,
        });

        res.status(201).json({
            success: true,
            result: {
                insertedId: newPassword._id,
                _id: newPassword._id,
            }
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { site, username, password } = passwordSchema.parse(req.body);

        const existing = await Password.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (existing.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const { iv, encryptedData, authTag } = encrypt(password);

        await Password.findByIdAndUpdate(req.params.id, {
            site,
            username,
            password: encryptedData,
            iv,
            authTag,
        });

        res.json({ success: true });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const existing = await Password.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (existing.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        await existing.deleteOne();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
