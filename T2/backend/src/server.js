const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`Listening at: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
  });
};

startServer();
