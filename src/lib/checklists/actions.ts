"use server";
import { neon } from "@neondatabase/serverless";

export async function getTemplateData() {
    const sql = neon(process.env.database_url!);
    const data = await sql`SELECT * FROM checklists`;
    return data;
}