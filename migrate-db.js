const mongoose = require('mongoose');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config({ path: '.env.local' });
const MONGODB_URI = process.env.MONGODB_URI;

async function migrate() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Starting migration...');

    const db = mongoose.connection.db;

    // Update Bookings
    const bookingResult = await db.collection('bookings').updateMany(
      { status: { $exists: false } },
      { $set: { status: 'pending' } }
    );
    console.log(`Updated ${bookingResult.modifiedCount} bookings with default status.`);

    // Update Loans
    const loanResult = await db.collection('loans').updateMany(
      { status: { $exists: false } },
      { $set: { status: 'pending' } }
    );
    console.log(`Updated ${loanResult.modifiedCount} loans with default status.`);

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
