const mongoose = require('mongoose');

async function connectMongoDb(MONGO_URI){

    mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => {
      console.error('Database connection error:', err);
      process.exit(1); // Exit the process on connection error
    });
}

module.exports = {
    connectMongoDb,
}