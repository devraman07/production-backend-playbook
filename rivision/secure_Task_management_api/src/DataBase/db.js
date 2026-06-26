import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
if(!sql) {
    console.log("db connection error");
}

export const db = drizzle(sql);
console.log("database connected");