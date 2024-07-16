// config.ts

import dotenv from 'dotenv';
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI ,
  PORT: process.env.PORT || 5000,
};

export default config;
