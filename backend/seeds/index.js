require('dotenv').config();

const { User } = require('../models/user');

const admin = require('../config/admin.json');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectWithRetry = (uris, options, maxAttempts = 5) => {
  connectWithRetry.timeout = connectWithRetry.timeout || 0;
  return mongoose.connect(uris, options, (err) => {
    if (err)
      if (connectWithRetry.timeout <= (maxAttempts - 1) * 5000) {
        console.error(
          `Failed to connect to mongo on startup - retrying in ${(connectWithRetry.timeout += 5000) / 1000
          } sec`,
          connectWithRetry.previousError != "" + err
            ? `\n${(connectWithRetry.previousError = err)}`
            : ""
        );
        setTimeout(connectWithRetry, connectWithRetry.timeout, uris, options);
      } else process.exit(1);
    else console.info("Connected to MongoDB successfully!");
  });
};

connectWithRetry(MONGO_URI);

;(async () => {

    try { 
        const user = await User.create(admin);
        console.info("Admin established successfully");
    } catch(e) {
        console.error(e);
    }

})();