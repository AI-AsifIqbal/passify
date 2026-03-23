const User = require('./backend/models/User');

async function test() {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb://localhost:27017/passify');
    try {
        const user = await User.create({ email: 'test3@example.com', password: 'password123' });
        console.log('Success:', user);
    } catch (err) {
        console.error('Error:', err.message);
        console.error(err.stack);
    }
    process.exit();
}
test();
