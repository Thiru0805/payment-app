import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  FRONTEND_BASE_URL,
  JUSPAY_API_KEY,
  JUSPAY_URL,
  JUSPAY_MERCHANT_ID,
  RETURN_URL,
  REDIRECT_URL
} = process.env;
