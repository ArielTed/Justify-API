import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

export { PORT, TOKEN_SECRET, DATABASE_URL };
