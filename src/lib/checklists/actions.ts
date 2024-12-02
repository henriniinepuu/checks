"use server";
import { neon } from "@neondatabase/serverless";

export async function getCustomers() {
    const sql = neon(process.env.database_url!);
    const customer_data = await sql`SELECT * FROM customer`;
    return customer_data;
}
export async function getCustomerName(customerId: number) {
    const sql = neon(process.env.database_url!);
    const customer_data = await sql`SELECT customername FROM customer WHERE customerid = ${customerId}`;
    return customer_data;
}


export async function getChecklists(customerId: number) {
    const sql = neon(process.env.database_url!);
    const checklist_data = await sql`SELECT * FROM checklists WHERE customerid = ${customerId}`;
    return checklist_data;
}

export async function getCustomerFromChecklist(checklistId: number) {
    const sql = neon(process.env.database_url!);
    const checklist_data = await sql`SELECT * FROM checklists WHERE checklistId = ${checklistId}`;
    return checklist_data;
}

export async function getTasks(checklistId: number) {
    const sql = neon(process.env.database_url!);
    const tasks_data = await sql`SELECT * FROM tasks WHERE checklistid = ${checklistId}`;
    return tasks_data;
}
