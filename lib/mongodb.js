const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://raw.githubusercontent.com/nimsara-md64/Bot-helper/refs/heads/main/Alive.jpg' },
    { key: 'ALIVE_MSG', value: 'Hello , I am alive now!!\n\n🚫𝐌𝐚𝐝𝐞 𝐛𝐲 𝐍_𝐈_𝐌_𝐒_𝐀_𝐑_𝐀🚫' },
    { key: 'PREFIX', value: '.' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
